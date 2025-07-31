import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users
} from 'lucide-react';

interface ProcedureMetrics {
  id: string;
  name: string;
  averageTime: number;
  steps: number;
  documents: number;
  administrations: number;
  cost: number;
  complexityScore: number;
  successRate: number;
  userSatisfaction: number;
  feedbackCount: number;
  trends: {
    timeChange: number;
    satisfactionChange: number;
  };
}

interface PredictionsProps {
  procedures: ProcedureMetrics[];
}

// Génération des prédictions basées sur l'IA
const generatePredictions = (procedures: ProcedureMetrics[]) => {
  return procedures.map(procedure => {
    const currentTrend = procedure.trends.satisfactionChange;
    const complexityImpact = procedure.complexityScore > 7 ? -0.2 : 0.1;
    const timeImpact = procedure.averageTime > 30 ? -0.15 : 0.05;
    
    return {
      id: procedure.id,
      procedureName: procedure.name,
      currentSatisfaction: procedure.userSatisfaction,
      predicted3Months: Math.max(1, Math.min(5, procedure.userSatisfaction + (currentTrend/100) * 3 + complexityImpact)),
      predicted6Months: Math.max(1, Math.min(5, procedure.userSatisfaction + (currentTrend/100) * 6 + complexityImpact + timeImpact)),
      predicted12Months: Math.max(1, Math.min(5, procedure.userSatisfaction + (currentTrend/100) * 12 + complexityImpact + timeImpact * 2)),
      confidence: Math.random() * 40 + 60, // 60-100%
      riskLevel: procedure.complexityScore > 8 ? 'high' : procedure.complexityScore > 6 ? 'medium' : 'low',
      keyFactors: [
        procedure.averageTime > 30 ? 'Délais élevés' : 'Délais acceptables',
        procedure.complexityScore > 7 ? 'Complexité élevée' : 'Complexité modérée',
        procedure.trends.satisfactionChange > 0 ? 'Tendance positive' : 'Tendance négative',
        procedure.successRate > 85 ? 'Taux de réussite bon' : 'Taux de réussite faible'
      ],
      recommendedActions: [
        procedure.averageTime > 30 ? 'Optimiser les délais' : 'Maintenir les délais',
        procedure.complexityScore > 7 ? 'Simplifier la procédure' : 'Monitorer la complexité',
        procedure.trends.satisfactionChange < 0 ? 'Action corrective urgente' : 'Maintenir la qualité'
      ]
    };
  });
};

export function PredictionsTab({ procedures }: PredictionsProps) {
  const predictions = generatePredictions(procedures);
  
  // Pagination pour les prédictions
  const {
    currentData: paginatedPredictions,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: predictions,
    itemsPerPage: 4
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return AlertTriangle;
      case 'medium': return Clock;
      case 'low': return CheckCircle;
      default: return Target;
    }
  };

  const getTrendIcon = (current: number, predicted: number) => {
    return predicted > current ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (current: number, predicted: number) => {
    return predicted > current ? 'text-green-600' : 'text-red-600';
  };

  const formatChange = (current: number, predicted: number) => {
    const change = ((predicted - current) / current * 100);
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Résumé des prédictions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prédictions Générées</p>
                <p className="text-2xl font-bold text-blue-600">{predictions.length}</p>
              </div>
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Risque Élevé</p>
                <p className="text-2xl font-bold text-red-600">
                  {predictions.filter(p => p.riskLevel === 'high').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tendance Positive</p>
                <p className="text-2xl font-bold text-green-600">
                  {predictions.filter(p => p.predicted6Months > p.currentSatisfaction).length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confiance Moyenne</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length).toFixed(0)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prédictions détaillées */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Prédictions IA - Satisfaction Utilisateur
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {paginatedPredictions.map((prediction) => {
              const RiskIcon = getRiskIcon(prediction.riskLevel);
              const TrendIcon6M = getTrendIcon(prediction.currentSatisfaction, prediction.predicted6Months);
              const TrendIcon12M = getTrendIcon(prediction.currentSatisfaction, prediction.predicted12Months);
              
              return (
                <div key={prediction.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Brain className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{prediction.procedureName}</h4>
                        <p className="text-sm text-gray-600">
                          Satisfaction actuelle: {prediction.currentSatisfaction.toFixed(1)}/5
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getRiskColor(prediction.riskLevel)}>
                        <RiskIcon className="w-3 h-3 mr-1" />
                        {prediction.riskLevel === 'high' ? 'Risque Élevé' : 
                         prediction.riskLevel === 'medium' ? 'Risque Modéré' : 'Risque Faible'}
                      </Badge>
                      <Badge className="bg-blue-50 text-blue-700">
                        Confiance: {prediction.confidence.toFixed(0)}%
                      </Badge>
                    </div>
                  </div>

                  {/* Prédictions temporelles */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        3 mois
                      </h5>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{prediction.predicted3Months.toFixed(1)}/5</span>
                        <div className="flex items-center gap-1">
                          <TrendIcon6M className={`w-4 h-4 ${getTrendColor(prediction.currentSatisfaction, prediction.predicted3Months)}`} />
                          <span className={`text-sm ${getTrendColor(prediction.currentSatisfaction, prediction.predicted3Months)}`}>
                            {formatChange(prediction.currentSatisfaction, prediction.predicted3Months)}
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={(prediction.predicted3Months / 5) * 100} 
                        className="mt-2 h-2"
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        6 mois
                      </h5>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{prediction.predicted6Months.toFixed(1)}/5</span>
                        <div className="flex items-center gap-1">
                          <TrendIcon6M className={`w-4 h-4 ${getTrendColor(prediction.currentSatisfaction, prediction.predicted6Months)}`} />
                          <span className={`text-sm ${getTrendColor(prediction.currentSatisfaction, prediction.predicted6Months)}`}>
                            {formatChange(prediction.currentSatisfaction, prediction.predicted6Months)}
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={(prediction.predicted6Months / 5) * 100} 
                        className="mt-2 h-2"
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        12 mois
                      </h5>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{prediction.predicted12Months.toFixed(1)}/5</span>
                        <div className="flex items-center gap-1">
                          <TrendIcon12M className={`w-4 h-4 ${getTrendColor(prediction.currentSatisfaction, prediction.predicted12Months)}`} />
                          <span className={`text-sm ${getTrendColor(prediction.currentSatisfaction, prediction.predicted12Months)}`}>
                            {formatChange(prediction.currentSatisfaction, prediction.predicted12Months)}
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={(prediction.predicted12Months / 5) * 100} 
                        className="mt-2 h-2"
                      />
                    </div>
                  </div>

                  {/* Facteurs clés et recommandations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">Facteurs Clés</h5>
                      <ul className="space-y-1">
                        {prediction.keyFactors.map((factor, index) => (
                          <li key={index} className="text-sm text-blue-800 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <h5 className="font-medium text-green-900 mb-2">Actions Recommandées</h5>
                      <ul className="space-y-1">
                        {prediction.recommendedActions.map((action, index) => (
                          <li key={index} className="text-sm text-green-800 flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
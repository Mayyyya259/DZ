import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  BarChart3, 
  Clock,
  Users,
  FileText
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

interface TemporalAnalysisProps {
  procedures: ProcedureMetrics[];
}

// Données temporelles simulées
const generateTemporalData = (procedures: ProcedureMetrics[]) => {
  return procedures.map(procedure => ({
    ...procedure,
    historicalData: [
      { period: '2024-Q1', time: procedure.averageTime + 5, satisfaction: procedure.userSatisfaction - 0.3, success: procedure.successRate - 5 },
      { period: '2024-Q2', time: procedure.averageTime + 2, satisfaction: procedure.userSatisfaction - 0.1, success: procedure.successRate - 2 },
      { period: '2024-Q3', time: procedure.averageTime, satisfaction: procedure.userSatisfaction, success: procedure.successRate },
      { period: '2024-Q4', time: procedure.averageTime + procedure.trends.timeChange, satisfaction: procedure.userSatisfaction + (procedure.trends.satisfactionChange/100), success: procedure.successRate + Math.random() * 10 - 5 }
    ]
  }));
};

export function TemporalAnalysisTab({ procedures }: TemporalAnalysisProps) {
  const temporalData = generateTemporalData(procedures);
  
  // Pagination pour l'analyse temporelle
  const {
    currentData: paginatedProcedures,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: temporalData,
    itemsPerPage: 4
  });

  const getTrendIcon = (change: number) => {
    return change > 0 ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (change: number) => {
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Résumé des tendances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Amélioration Délais</p>
                <p className="text-2xl font-bold text-green-600">
                  {procedures.filter(p => p.trends.timeChange < 0).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction en Hausse</p>
                <p className="text-2xl font-bold text-blue-600">
                  {procedures.filter(p => p.trends.satisfactionChange > 0).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stabilité</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {procedures.filter(p => Math.abs(p.trends.timeChange) < 2 && Math.abs(p.trends.satisfactionChange) < 5).length}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analyse détaillée par procédure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Évolution Temporelle des Procédures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {paginatedProcedures.map((procedure) => (
              <div key={procedure.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-lg">{procedure.name}</h4>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-50 text-blue-700">
                      Évolution 4 trimestres
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Délais */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Délais de traitement
                    </h5>
                    <div className="space-y-2">
                      {procedure.historicalData.map((data, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{data.period}</span>
                          <span className="font-medium">{data.time.toFixed(0)} jours</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t flex items-center gap-1">
                      {(() => {
                        const Icon = getTrendIcon(procedure.trends.timeChange);
                        return (
                          <>
                            <Icon className={`w-4 h-4 ${getTrendColor(procedure.trends.timeChange)}`} />
                            <span className={`text-sm font-medium ${getTrendColor(procedure.trends.timeChange)}`}>
                              {Math.abs(procedure.trends.timeChange)} jours
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Satisfaction */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Satisfaction utilisateur
                    </h5>
                    <div className="space-y-2">
                      {procedure.historicalData.map((data, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{data.period}</span>
                          <span className="font-medium">{data.satisfaction.toFixed(1)}/5</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t flex items-center gap-1">
                      {(() => {
                        const Icon = getTrendIcon(procedure.trends.satisfactionChange);
                        return (
                          <>
                            <Icon className={`w-4 h-4 ${getTrendColor(procedure.trends.satisfactionChange)}`} />
                            <span className={`text-sm font-medium ${getTrendColor(procedure.trends.satisfactionChange)}`}>
                              {Math.abs(procedure.trends.satisfactionChange)}%
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Taux de réussite */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Taux de réussite
                    </h5>
                    <div className="space-y-2">
                      {procedure.historicalData.map((data, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{data.period}</span>
                          <span className="font-medium">{data.success.toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <Badge className="bg-green-50 text-green-700">
                        Stable
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
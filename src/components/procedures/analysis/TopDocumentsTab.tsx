import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  FileText, 
  Download, 
  Eye, 
  Star,
  TrendingUp,
  Calendar,
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

interface TopDocumentsProps {
  procedures: ProcedureMetrics[];
}

// Génération des documents populaires basés sur les procédures
const generateTopDocuments = (procedures: ProcedureMetrics[]) => {
  const documents = [
    { id: '1', name: 'Guide de création SARL', type: 'Guide', procedureId: '1', downloads: 2847, views: 15623, rating: 4.7, size: '2.3 MB', lastUpdated: '2024-01-20' },
    { id: '2', name: 'Formulaire inscription commerce', type: 'Formulaire', procedureId: '2', downloads: 1923, views: 8956, rating: 4.2, size: '1.8 MB', lastUpdated: '2024-01-18' },
    { id: '3', name: 'Checklist permis construire', type: 'Checklist', procedureId: '3', downloads: 1756, views: 7234, rating: 4.5, size: '950 KB', lastUpdated: '2024-01-15' },
    { id: '4', name: 'Modèle contrat travail', type: 'Modèle', procedureId: '4', downloads: 1654, views: 6789, rating: 4.3, size: '1.2 MB', lastUpdated: '2024-01-12' },
    { id: '5', name: 'Guide carte séjour', type: 'Guide', procedureId: '5', downloads: 1432, views: 5896, rating: 4.1, size: '3.1 MB', lastUpdated: '2024-01-10' },
    { id: '6', name: 'Notice passeport biométrique', type: 'Notice', procedureId: '6', downloads: 1298, views: 5234, rating: 4.4, size: '2.7 MB', lastUpdated: '2024-01-08' },
    { id: '7', name: 'Guide aide sociale', type: 'Guide', procedureId: '7', downloads: 1156, views: 4567, rating: 3.9, size: '1.9 MB', lastUpdated: '2024-01-05' },
    { id: '8', name: 'Formulaire carte identité', type: 'Formulaire', procedureId: '8', downloads: 1089, views: 4123, rating: 4.6, size: '1.1 MB', lastUpdated: '2024-01-03' },
    { id: '9', name: 'Procédure divorce', type: 'Procédure', procedureId: '9', downloads: 987, views: 3892, rating: 4.0, size: '2.8 MB', lastUpdated: '2024-01-01' },
    { id: '10', name: 'Guide inscription université', type: 'Guide', procedureId: '10', downloads: 876, views: 3456, rating: 4.3, size: '2.2 MB', lastUpdated: '2023-12-28' },
    { id: '11', name: 'Modèle bail location', type: 'Modèle', procedureId: '1', downloads: 765, views: 3123, rating: 4.2, size: '1.5 MB', lastUpdated: '2023-12-25' },
    { id: '12', name: 'Notice déclaration fiscale', type: 'Notice', procedureId: '2', downloads: 654, views: 2789, rating: 3.8, size: '3.4 MB', lastUpdated: '2023-12-22' }
  ];

  return documents.map(doc => ({
    ...doc,
    procedureName: procedures.find(p => p.id === doc.procedureId)?.name || 'Procédure inconnue'
  }));
};

export function TopDocumentsTab({ procedures }: TopDocumentsProps) {
  const topDocuments = generateTopDocuments(procedures);
  
  // Pagination pour les documents populaires
  const {
    currentData: paginatedDocuments,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: topDocuments,
    itemsPerPage: 6
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Guide': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Formulaire': return 'bg-green-50 text-green-700 border-green-200';
      case 'Checklist': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Modèle': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Notice': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Procédure': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${
              i < fullStars ? 'text-yellow-400 fill-current' : 
              i === fullStars && hasHalfStar ? 'text-yellow-400 fill-current opacity-50' : 
              'text-gray-300'
            }`} 
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-blue-600">{topDocuments.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Téléchargements</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatNumber(topDocuments.reduce((sum, doc) => sum + doc.downloads, 0))}
                </p>
              </div>
              <Download className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vues</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatNumber(topDocuments.reduce((sum, doc) => sum + doc.views, 0))}
                </p>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Note Moyenne</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {(topDocuments.reduce((sum, doc) => sum + doc.rating, 0) / topDocuments.length).toFixed(1)}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des documents populaires */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Documents les Plus Populaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedDocuments.map((document, index) => (
              <div key={document.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{document.name}</h4>
                      <p className="text-sm text-gray-600">{document.procedureName}</p>
                      <div className="mt-1">
                        {getRatingStars(document.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getTypeColor(document.type)}>
                      {document.type}
                    </Badge>
                    <span className="text-sm text-gray-500">#{(currentPage - 1) * itemsPerPage + index + 1}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{formatNumber(document.downloads)} téléchargements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{formatNumber(document.views)} vues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{document.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">{document.lastUpdated}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Aperçu
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </Button>
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
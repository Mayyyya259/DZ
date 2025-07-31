
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabFormField } from '@/components/common/TabFormField';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Newspaper, Calendar, TrendingUp, Users, FileText, Settings } from 'lucide-react';
import { AddNewsForm } from '@/components/forms/AddNewsForm';
import { useGlobalActions } from '@/hooks/useGlobalActions';
import { ApiImportModal } from '@/components/modals/ApiImportModal';
import { useApiModalHandler } from '@/hooks/useApiModalHandler';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin,
  Award,
  BookOpen,
  Gavel,
  Scale,
  Building,
  GraduationCap
} from 'lucide-react';

export function NewsSection() {
  const [showAddForm, setShowAddForm] = useState(false);
  const actions = useGlobalActions();
  const { showApiModal, apiContext, openApiModal, closeApiModal } = useApiModalHandler();

  // Données dynamiques pour les actualités
  const newsData = [
    { id: 1, title: "Réforme du Code Civil", date: "Il y a 2 jours", description: "Le gouvernement a annoncé une réforme majeure du Code Civil...", category: "Législation" },
    { id: 2, title: "Nouvelle Loi sur la Protection des Données", date: "Il y a 1 semaine", description: "Une nouvelle loi renforce la protection des données personnelles...", category: "RGPD" },
    { id: 3, title: "Impact du Brexit sur les Contrats Internationaux", date: "Il y a 2 semaines", description: "Le Brexit continue d'impacter les contrats internationaux...", category: "International" },
    { id: 4, title: "Nouvelle Jurisprudence sur les Marques", date: "Il y a 3 jours", description: "La Cour de Cassation clarifie les critères de protection des marques...", category: "Propriété Intellectuelle" },
    { id: 5, title: "Réforme de la Procédure Administrative", date: "Il y a 1 jour", description: "Simplification des procédures administratives pour les entreprises...", category: "Administratif" },
    { id: 6, title: "Nouvelle Directive sur les Marchés Publics", date: "Il y a 4 jours", description: "Transparence renforcée dans les marchés publics...", category: "Marchés Publics" },
    { id: 7, title: "Protection des Données Bancaires", date: "Il y a 5 jours", description: "Nouvelles mesures de sécurité pour les données bancaires...", category: "Bancaire" },
    { id: 8, title: "Réforme du Droit du Travail", date: "Il y a 1 semaine", description: "Modernisation du code du travail algérien...", category: "Travail" },
    { id: 9, title: "Nouvelle Loi sur l'Environnement", date: "Il y a 2 semaines", description: "Renforcement de la protection environnementale...", category: "Environnement" },
    { id: 10, title: "Réforme de la Justice Pénale", date: "Il y a 3 jours", description: "Modernisation de la procédure pénale...", category: "Pénal" },
    { id: 11, title: "Protection des Consommateurs", date: "Il y a 6 jours", description: "Nouvelles garanties pour les consommateurs...", category: "Consommation" },
    { id: 12, title: "Droit Numérique et IA", date: "Il y a 1 semaine", description: "Cadre juridique pour l'intelligence artificielle...", category: "Numérique" }
  ];

  // Données dynamiques pour les événements
  const eventsData = [
    { id: 1, title: "Conférence sur le Droit du Numérique", date: "15 Mai 2024", location: "Alger", category: "Conférence" },
    { id: 2, title: "Atelier sur la Médiation", date: "22 Juin 2024", location: "Oran", category: "Atelier" },
    { id: 3, title: "Séminaire sur la Compliance", date: "5 Juillet 2024", location: "Constantine", category: "Séminaire" },
    { id: 4, title: "Forum sur l'Arbitrage International", date: "12 Septembre 2024", location: "Alger", category: "Forum" },
    { id: 5, title: "Formation sur le RGPD", date: "28 Octobre 2024", location: "Oran", category: "Formation" },
    { id: 6, title: "Colloque sur le Droit des Affaires", date: "10 Novembre 2024", location: "Constantine", category: "Colloque" },
    { id: 7, title: "Journée du Droit de l'Environnement", date: "15 Décembre 2024", location: "Annaba", category: "Journée" },
    { id: 8, title: "Workshop sur la Cybersécurité", date: "20 Janvier 2025", location: "Sétif", category: "Workshop" },
    { id: 9, title: "Conférence sur l'Innovation Juridique", date: "25 Février 2025", location: "Alger", category: "Conférence" },
    { id: 10, title: "Séminaire sur le Droit Maritime", date: "10 Mars 2025", location: "Oran", category: "Séminaire" },
    { id: 11, title: "Forum sur la Justice Restaurative", date: "15 Avril 2025", location: "Constantine", category: "Forum" },
    { id: 12, title: "Colloque sur le Droit Constitutionnel", date: "20 Mai 2025", location: "Alger", category: "Colloque" }
  ];

  // Pagination pour les actualités
  const {
    currentData: paginatedNews,
    currentPage: newsCurrentPage,
    totalPages: newsTotalPages,
    itemsPerPage: newsItemsPerPage,
    totalItems: newsTotalItems,
    setCurrentPage: setNewsCurrentPage,
    setItemsPerPage: setNewsItemsPerPage
  } = usePagination({
    data: newsData,
    itemsPerPage: 10
  });

  // Pagination pour les événements
  const {
    currentData: paginatedEvents,
    currentPage: eventsCurrentPage,
    totalPages: eventsTotalPages,
    itemsPerPage: eventsItemsPerPage,
    totalItems: eventsTotalItems,
    setCurrentPage: setEventsCurrentPage,
    setItemsPerPage: setEventsItemsPerPage
  } = usePagination({
    data: eventsData,
    itemsPerPage: 10
  });

  // Données pour les analyses
  const analysesData = [
    { id: 1, title: "L'essor du Droit Numérique", author: "Me. Ali Ahmed", summary: "Analyse de l'impact croissant du numérique sur le droit..." },
    { id: 2, title: "La Compliance au cœur des Entreprises", author: "Dr. Fatima Ben", summary: "Décryptage des enjeux de la compliance pour les entreprises algériennes..." },
    { id: 3, title: "Les Défis de l'Arbitrage International", author: "Pr. Karim Said", summary: "Analyse des défis et opportunités de l'arbitrage international..." },
    { id: 4, title: "L'Intelligence Artificielle et le Droit", author: "LegalTechDZ", summary: "Quel est le futur de l'IA dans le secteur juridique ?..." },
    { id: 5, title: "La Fiscalité des Entreprises en Algérie", author: "TaxAdvisorDZ", summary: "Panorama des réformes fiscales récentes..." },
    { id: 6, title: "Le Droit du Travail en Algérie", author: "LabourRights", summary: "Évolutions majeures du droit du travail..." },
    { id: 7, title: "La Protection des Données en Algérie", author: "DataLawyer", summary: "Nouvelles obligations pour les entreprises..." }
  ];

  // Pagination pour les analyses
  const {
    currentData: paginatedAnalyses,
    currentPage: analysesCurrentPage,
    totalPages: analysesTotalPages,
    itemsPerPage: analysesItemsPerPage,
    totalItems: analysesTotalItems,
    setCurrentPage: setAnalysesCurrentPage,
    setItemsPerPage: setAnalysesItemsPerPage
  } = usePagination({
    data: analysesData,
    itemsPerPage: 3
  });

  // Données pour les discussions
  const discussionsData = [
    { id: 1, title: "La Réforme du Code de Commerce", author: "Ali23", summary: "Quels sont les impacts de la réforme sur les entreprises ?..." },
    { id: 2, title: "Les Nouveaux Défis de la Profession d'Avocat", author: "YasmineK", summary: "Comment s'adapter aux mutations du monde juridique ?..." },
    { id: 3, title: "L'Intelligence Artificielle et le Droit", author: "LegalTechDZ", summary: "Quel est le futur de l'IA dans le secteur juridique ?..." },
    { id: 4, title: "La Compliance dans les PME", author: "PMEExpert", summary: "Quels outils pour une conformité efficace ?..." },
    { id: 5, title: "La Médiation en Algérie", author: "MediationDZ", summary: "La médiation comme alternative au contentieux..." }
  ];
  const articlesData = [
    { id: 1, title: "La Protection des Données en Algérie", author: "DataLawyer" },
    { id: 2, title: "Les Contrats Commerciaux Internationaux", author: "TradeExpert" },
    { id: 3, title: "Le Droit du Travail en Algérie", author: "LabourRights" },
    { id: 4, title: "La Fiscalité des Entreprises en Algérie", author: "TaxAdvisorDZ" },
    { id: 5, title: "L'Arbitrage et la Médiation en Algérie", author: "ADRSolutions" },
    { id: 6, title: "Le Droit de la Propriété Intellectuelle", author: "IntellectualProperty" }
  ];

  // Pagination pour les discussions
  const {
    currentData: paginatedDiscussions,
    currentPage: discussionsCurrentPage,
    totalPages: discussionsTotalPages,
    itemsPerPage: discussionsItemsPerPage,
    totalItems: discussionsTotalItems,
    setCurrentPage: setDiscussionsCurrentPage,
    setItemsPerPage: setDiscussionsItemsPerPage
  } = usePagination({
    data: discussionsData,
    itemsPerPage: 2
  });
  // Pagination pour les articles
  const {
    currentData: paginatedArticles,
    currentPage: articlesCurrentPage,
    totalPages: articlesTotalPages,
    itemsPerPage: articlesItemsPerPage,
    totalItems: articlesTotalItems,
    setCurrentPage: setArticlesCurrentPage,
    setItemsPerPage: setArticlesItemsPerPage
  } = usePagination({
    data: articlesData,
    itemsPerPage: 3
  });

  // Données pour les professions juridiques
  const legalProfessions = [
    {
      id: 1,
      name: "Dr. Ahmed Benali",
      profession: "Avocat",
      speciality: "Droit commercial",
      experience: "15 ans",
      location: "Alger",
      rating: 4.8,
      cases: 127,
      publications: 23,
      status: "Actif"
    },
    {
      id: 2,
      name: "Mme Fatima Cherif",
      profession: "Notaire",
      speciality: "Droit immobilier",
      experience: "12 ans",
      location: "Oran",
      rating: 4.9,
      cases: 89,
      publications: 15,
      status: "Actif"
    },
    {
      id: 3,
      name: "Dr. Karim Meziane",
      profession: "Huissier",
      speciality: "Exécution forcée",
      experience: "8 ans",
      location: "Constantine",
      rating: 4.6,
      cases: 234,
      publications: 8,
      status: "Actif"
    },
    {
      id: 4,
      name: "Mme Leila Mansouri",
      profession: "Avocat",
      speciality: "Droit pénal",
      experience: "20 ans",
      location: "Alger",
      rating: 4.7,
      cases: 156,
      publications: 31,
      status: "Actif"
    },
    {
      id: 5,
      name: "Dr. Yacine Brahim",
      profession: "Notaire",
      speciality: "Droit des sociétés",
      experience: "10 ans",
      location: "Annaba",
      rating: 4.5,
      cases: 67,
      publications: 12,
      status: "Actif"
    },
    {
      id: 6,
      name: "M. Salim Kaced",
      profession: "Huissier",
      speciality: "Recouvrement",
      experience: "6 ans",
      location: "Tlemcen",
      rating: 4.4,
      cases: 189,
      publications: 5,
      status: "Actif"
    },
    {
      id: 7,
      name: "Dr. Amina Bouaziz",
      profession: "Avocat",
      speciality: "Droit administratif",
      experience: "18 ans",
      location: "Alger",
      rating: 4.8,
      cases: 203,
      publications: 28,
      status: "Actif"
    },
    {
      id: 8,
      name: "M. Kamel Boudiaf",
      profession: "Notaire",
      speciality: "Droit familial",
      experience: "14 ans",
      location: "Blida",
      rating: 4.6,
      cases: 145,
      publications: 19,
      status: "Actif"
    }
  ];

  // Données pour les cabinets juridiques
  const legalFirms = [
    {
      id: 1,
      name: "Cabinet Benali & Associés",
      type: "Cabinet d'avocats",
      specialities: ["Droit commercial", "Droit des sociétés", "Droit fiscal"],
      location: "Alger Centre",
      size: "15 avocats",
      founded: "2010",
      rating: 4.8,
      cases: 1250
    },
    {
      id: 2,
      name: "Étude Notariale Cherif",
      type: "Étude notariale",
      specialities: ["Droit immobilier", "Droit familial", "Successions"],
      location: "Oran",
      size: "8 notaires",
      founded: "2008",
      rating: 4.9,
      cases: 890
    },
    {
      id: 3,
      name: "Office d'Huissier Meziane",
      type: "Office d'huissier",
      specialities: ["Exécution forcée", "Recouvrement", "Significations"],
      location: "Constantine",
      size: "5 huissiers",
      founded: "2015",
      rating: 4.6,
      cases: 2100
    },
    {
      id: 4,
      name: "Cabinet Mansouri & Partners",
      type: "Cabinet d'avocats",
      specialities: ["Droit pénal", "Droit administratif", "Contentieux"],
      location: "Alger",
      size: "12 avocats",
      founded: "2005",
      rating: 4.7,
      cases: 980
    },
    {
      id: 5,
      name: "Étude Notariale Brahim",
      type: "Étude notariale",
      specialities: ["Droit des sociétés", "Fusions-acquisitions", "Contrats"],
      location: "Annaba",
      size: "6 notaires",
      founded: "2012",
      rating: 4.5,
      cases: 450
    },
    {
      id: 6,
      name: "Office d'Huissier Kaced",
      type: "Office d'huissier",
      specialities: ["Recouvrement", "Exécution", "Mise en demeure"],
      location: "Tlemcen",
      size: "3 huissiers",
      founded: "2017",
      rating: 4.4,
      cases: 1200
    }
  ];

  // Pagination pour les professions juridiques
  const {
    currentData: paginatedProfessions,
    currentPage: professionsCurrentPage,
    totalPages: professionsTotalPages,
    itemsPerPage: professionsItemsPerPage,
    totalItems: professionsTotalItems,
    setCurrentPage: setProfessionsCurrentPage,
    setItemsPerPage: setProfessionsItemsPerPage
  } = usePagination({
    data: legalProfessions,
    itemsPerPage: 4
  });

  // Pagination pour les cabinets juridiques
  const {
    currentData: paginatedFirms,
    currentPage: firmsCurrentPage,
    totalPages: firmsTotalPages,
    itemsPerPage: firmsItemsPerPage,
    totalItems: firmsTotalItems,
    setCurrentPage: setFirmsCurrentPage,
    setItemsPerPage: setFirmsItemsPerPage
  } = usePagination({
    data: legalFirms,
    itemsPerPage: 3
  });

  const handleAdd = () => {
    console.log('Opening add news form...');
    setShowAddForm(true);
  };

  const handleEnrich = () => {
    console.log('Opening enrichment with file import...');
    actions.handleImport(['.pdf', '.doc', '.docx', '.txt']);
  };

  const handleApiConfig = () => {
    openApiModal('news');
  };

  const handleCloseForm = () => {
    console.log('Closing add news form...');
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <AddNewsForm 
        isOpen={true} 
        onClose={handleCloseForm} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="actualites" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="actualites" className="gap-2">
            <Newspaper className="w-4 h-4" />
            Actualités Récentes
          </TabsTrigger>
          <TabsTrigger value="analyse" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Analyse & Tendances
          </TabsTrigger>
          <TabsTrigger value="communaute" className="gap-2">
            <Users className="w-4 h-4" />
            Communauté
          </TabsTrigger>
        </TabsList>

        <TabsContent value="actualites" className="mt-6 space-y-6">
          {/* Boutons d'action connectés */}
          <div className="flex gap-3 justify-center mb-6">
            <Button className="gap-2" onClick={handleAdd}>
              <Newspaper className="w-4 h-4" />
              Ajouter
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleEnrich}>
              <FileText className="w-4 h-4" />
              Enrichir
            </Button>
            <Button variant="outline" className="gap-2 border-purple-200 text-purple-700 hover:bg-purple-50" onClick={handleApiConfig}>
              <Settings className="w-4 h-4" />
              API
            </Button>
          </div>

          <TabFormField
            placeholder="Rechercher dans les actualités..."
            onSearch={(query) => console.log('Recherche actualités:', query)}
            showActions={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-red-600" />
                  Dernières Actualités
                </CardTitle>
                <p className="text-sm text-gray-600">Suivez les actualités juridiques en temps réel</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {paginatedNews.map((news) => (
                    <div key={news.id} className="p-3 border rounded hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{news.title}</span>
                        <span className="text-xs text-gray-500">{news.date}</span>
                      </div>
                      <p className="text-xs text-gray-600">{news.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-blue-600">{news.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination pour les actualités */}
                <Pagination
                  currentPage={newsCurrentPage}
                  totalPages={newsTotalPages}
                  totalItems={newsTotalItems}
                  itemsPerPage={newsItemsPerPage}
                  onPageChange={setNewsCurrentPage}
                  onItemsPerPageChange={setNewsItemsPerPage}
                />
                
                <Button className="w-full">
                  Voir toutes les actualités
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Événements Juridiques à Venir
                </CardTitle>
                <p className="text-sm text-gray-600">Ne manquez aucun événement important du secteur juridique</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paginatedEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-gray-50 rounded">
                        <div className="font-medium text-sm">{event.title}</div>
                        <p className="text-xs text-gray-600">{event.date} - {event.location}</p>
                        <span className="text-xs text-purple-600">{event.category}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pagination pour les événements */}
                  <Pagination
                    currentPage={eventsCurrentPage}
                    totalPages={eventsTotalPages}
                    totalItems={eventsTotalItems}
                    itemsPerPage={eventsItemsPerPage}
                    onPageChange={setEventsCurrentPage}
                    onItemsPerPageChange={setEventsItemsPerPage}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analyse" className="mt-6 space-y-6">
          {/* Boutons d'action connectés */}
          <div className="flex gap-3 justify-center mb-6">
            <Button className="gap-2" onClick={handleAdd}>
              <Newspaper className="w-4 h-4" />
              Ajouter
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleEnrich}>
              <FileText className="w-4 h-4" />
              Enrichir
            </Button>
          </div>

          <TabFormField
            placeholder="Rechercher dans les analyses..."
            onSearch={(query) => console.log('Recherche analyses:', query)}
            showActions={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Analyse des Tendances Juridiques
                </CardTitle>
                <p className="text-sm text-gray-600">Décryptage des grandes tendances du droit algérien</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {paginatedAnalyses.map((analysis) => (
                    <div key={analysis.id} className="p-3 border rounded hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{analysis.title}</span>
                        <span className="text-xs text-gray-500">Par {analysis.author}</span>
                      </div>
                      <p className="text-xs text-gray-600">{analysis.summary}</p>
                    </div>
                  ))}
                </div>
                <Pagination
                  currentPage={analysesCurrentPage}
                  totalPages={analysesTotalPages}
                  totalItems={analysesTotalItems}
                  itemsPerPage={analysesItemsPerPage}
                  onPageChange={setAnalysesCurrentPage}
                  onItemsPerPageChange={setAnalysesItemsPerPage}
                />
                <Button className="w-full">
                  Consulter toutes les analyses
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Focus sur les Professions Juridiques
                </CardTitle>
                <p className="text-sm text-gray-600">Zoom sur les acteurs clés du monde juridique algérien</p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="professions" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="professions">Professionnels</TabsTrigger>
                    <TabsTrigger value="cabinets">Cabinets</TabsTrigger>
                  </TabsList>

                  <TabsContent value="professions" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paginatedProfessions.map((profession) => (
                        <div key={profession.id} className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-sm">{profession.name}</h4>
                              <p className="text-xs text-gray-600">{profession.profession}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              {profession.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2">
                              <Scale className="w-3 h-3 text-blue-600" />
                              <span>{profession.speciality}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-gray-500" />
                              <span>{profession.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-3 h-3 text-yellow-600" />
                              <span>{profession.experience} d'expérience</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Gavel className="w-3 h-3 text-purple-600" />
                              <span>{profession.cases} dossiers traités</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 pt-3 border-t">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-medium">{profession.rating}</span>
                              <span className="text-xs text-gray-500">/5</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{profession.publications} publications</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Pagination pour les professionnels */}
                    {professionsTotalPages > 1 && (
                      <div className="mt-4">
                        <Pagination
                          currentPage={professionsCurrentPage}
                          totalPages={professionsTotalPages}
                          totalItems={professionsTotalItems}
                          itemsPerPage={professionsItemsPerPage}
                          onPageChange={setProfessionsCurrentPage}
                          onItemsPerPageChange={setProfessionsItemsPerPage}
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="cabinets" className="space-y-4">
                    <div className="space-y-4">
                      {paginatedFirms.map((firm) => (
                        <div key={firm.id} className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-sm">{firm.name}</h4>
                              <p className="text-xs text-gray-600">{firm.type}</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              {firm.size}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2">
                              <Building className="w-3 h-3 text-blue-600" />
                              <span>{firm.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3 text-gray-500" />
                              <span>Fondé en {firm.founded}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Gavel className="w-3 h-3 text-purple-600" />
                              <span>{firm.cases} dossiers traités</span>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1 mb-2">
                              {firm.specialities.map((speciality, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {speciality}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-medium">{firm.rating}</span>
                              <span className="text-xs text-gray-500">/5</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Pagination pour les cabinets */}
                    {firmsTotalPages > 1 && (
                      <div className="mt-4">
                        <Pagination
                          currentPage={firmsCurrentPage}
                          totalPages={firmsTotalPages}
                          totalItems={firmsTotalItems}
                          itemsPerPage={firmsItemsPerPage}
                          onPageChange={setFirmsCurrentPage}
                          onItemsPerPageChange={setFirmsItemsPerPage}
                        />
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communaute" className="mt-6 space-y-6">
          {/* Boutons d'action connectés */}
          <div className="flex gap-3 justify-center mb-6">
            <Button className="gap-2" onClick={handleAdd}>
              <Newspaper className="w-4 h-4" />
              Ajouter
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleEnrich}>
              <FileText className="w-4 h-4" />
              Enrichir
            </Button>
          </div>

          <TabFormField
            placeholder="Rechercher dans la communauté..."
            onSearch={(query) => console.log('Recherche communauté:', query)}
            showActions={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  Discussions Juridiques
                </CardTitle>
                <p className="text-sm text-gray-600">Participez aux discussions et échangez avec vos pairs</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {paginatedDiscussions.map((discussion) => (
                    <div key={discussion.id} className="p-3 border rounded hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{discussion.title}</span>
                        <span className="text-xs text-gray-500">Par {discussion.author}</span>
                      </div>
                      <p className="text-xs text-gray-600">{discussion.summary}</p>
                    </div>
                  ))}
                </div>
                <Pagination
                  currentPage={discussionsCurrentPage}
                  totalPages={discussionsTotalPages}
                  totalItems={discussionsTotalItems}
                  itemsPerPage={discussionsItemsPerPage}
                  onPageChange={setDiscussionsCurrentPage}
                  onItemsPerPageChange={setDiscussionsItemsPerPage}
                />
                <Button className="w-full">
                  Rejoindre les discussions
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-red-600" />
                  Derniers Articles de la Communauté
                </CardTitle>
                <p className="text-sm text-gray-600">Découvrez les articles rédigés par les membres de la communauté</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paginatedArticles.map((article) => (
                    <div key={article.id} className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">{article.title}</div>
                      <p className="text-xs text-gray-600">Par {article.author}</p>
                    </div>
                  ))}
                </div>
                <Pagination
                  currentPage={articlesCurrentPage}
                  totalPages={articlesTotalPages}
                  totalItems={articlesTotalItems}
                  itemsPerPage={articlesItemsPerPage}
                  onPageChange={setArticlesCurrentPage}
                  onItemsPerPageChange={setArticlesItemsPerPage}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <ApiImportModal
        isOpen={showApiModal}
        onClose={closeApiModal}
        context={apiContext}
      />
    </div>
  );
}

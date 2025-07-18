import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TestResult } from './VocationalTest';
import { 
  Palette, 
  Brain, 
  Users, 
  Crown, 
  Heart, 
  TrendingUp,
  Star,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface ResultsSectionProps {
  result: TestResult;
  onRetake: () => void;
}

const profileData = {
  creative: {
    title: "Perfil Creativo y Comunicador",
    icon: Palette,
    color: "bg-purple-500",
    description: "Personas con habilidades de comunicación excepcionales, creativas y orientadas a tareas variadas.",
    strengths: [
      "Habilidades de comunicación",
      "Creatividad",
      "Adaptabilidad",
      "Pensamiento innovador"
    ],
    areasToLearn: [
      "Diseño gráfico",
      "Marketing digital",
      "Copywriting",
      "Creación de contenido",
      "Gestión de redes sociales"
    ],
    careers: [
      "Diseñador gráfico",
      "Community manager",
      "Marketing digital",
      "Copywriter",
      "Creador de contenido"
    ]
  },
  logical: {
    title: "Perfil Lógico y Analítico",
    icon: Brain,
    color: "bg-blue-500",
    description: "Personas con fuerte capacidad de resolución de problemas, organización y análisis de datos.",
    strengths: [
      "Resolución de problemas",
      "Organización",
      "Análisis de datos",
      "Pensamiento lógico"
    ],
    areasToLearn: [
      "Desarrollo web",
      "Contabilidad",
      "Análisis de datos",
      "SEO",
      "Publicidad digital"
    ],
    careers: [
      "Desarrollador web",
      "Contable remoto",
      "Especialista SEO",
      "Trafficker",
      "Data Analyst"
    ]
  },
  support: {
    title: "Perfil de Apoyo y Organización",
    icon: Users,
    color: "bg-green-500",
    description: "Personas organizadas, meticulosas y con excelente capacidad para gestionar tareas y proyectos.",
    strengths: [
      "Organización",
      "Gestión de tareas",
      "Atención al detalle",
      "Coordinación"
    ],
    areasToLearn: [
      "Asistencia virtual",
      "Coaching de ventas",
      "Gestión de proyectos",
      "Administración",
      "Customer service"
    ],
    careers: [
      "Asistente virtual",
      "Project manager",
      "Customer service",
      "Coach de ventas",
      "Coordinador de proyectos"
    ]
  },
  leader: {
    title: "Perfil de Líder Independiente",
    icon: Crown,
    color: "bg-orange-500",
    description: "Personas autónomas, con habilidades de liderazgo y capacidad para tomar decisiones estratégicas.",
    strengths: [
      "Autonomía",
      "Liderazgo",
      "Toma de decisiones",
      "Visión estratégica"
    ],
    areasToLearn: [
      "Coaching",
      "Ventas",
      "Gestión de equipos",
      "Desarrollo de negocios",
      "Estrategia empresarial"
    ],
    careers: [
      "Líder de ventas",
      "Mentor o coach",
      "Director de proyectos",
      "Consultor estratégico",
      "Emprendedor"
    ]
  },
  empathetic: {
    title: "Perfil Empático y Relacional",
    icon: Heart,
    color: "bg-pink-500",
    description: "Personas con gran empatía, habilidades sociales y orientación al servicio al cliente.",
    strengths: [
      "Empatía",
      "Comunicación social",
      "Servicio al cliente",
      "Habilidades interpersonales"
    ],
    areasToLearn: [
      "Community management",
      "Educación en línea",
      "Coaching personal",
      "Atención al cliente",
      "Psicología aplicada"
    ],
    careers: [
      "Community manager",
      "Educador online",
      "Coach de desarrollo personal",
      "Especialista en atención al cliente",
      "Terapeuta online"
    ]
  },
  trafficker: {
    title: "Perfil Trafficker Estratégico",
    icon: TrendingUp,
    color: "bg-red-500",
    description: "Personas orientadas a resultados, con habilidades analíticas y enfoque en optimización de campañas.",
    strengths: [
      "Análisis de datos",
      "Optimización de campañas",
      "Enfoque en resultados",
      "Pensamiento estratégico"
    ],
    areasToLearn: [
      "Google Ads",
      "Meta Ads",
      "Analytics",
      "SEO",
      "Herramientas de marketing digital"
    ],
    careers: [
      "Trafficker",
      "Especialista en Ads",
      "Consultor digital",
      "Growth Hacker",
      "Analista de marketing"
    ]
  }
};

export const ResultsSection = ({ result, onRetake }: ResultsSectionProps) => {
  const profile = profileData[result.profile];
  const IconComponent = profile.icon;

  // Ordenar los scores para mostrar el ranking
  const sortedScores = Object.entries(result.scores)
    .sort(([, a], [, b]) => b - a)
    .map(([key, score]) => ({ profile: key, score, data: profileData[key as keyof typeof profileData] }));

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">¡Tus Resultados!</h1>
          <p className="text-lg text-muted-foreground">
            Basado en tus respuestas, hemos identificado tu perfil profesional ideal
          </p>
        </div>

        {/* Main Result */}
        <Card className="bg-gradient-hero text-primary-foreground shadow-glow border-0 mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`w-20 h-20 rounded-full ${profile.color} flex items-center justify-center shadow-lg`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl md:text-3xl">{profile.title}</CardTitle>
            <p className="text-lg opacity-90 mt-2">{profile.description}</p>
          </CardHeader>
        </Card>

        {/* Detailed Results */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Strengths */}
          <Card className="bg-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Tus Fortalezas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.strengths.map((strength, index) => (
                  <Badge key={index} variant="secondary" className="w-full justify-start">
                    {strength}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Areas to Learn */}
          <Card className="bg-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Áreas Recomendadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.areasToLearn.map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span className="text-sm">{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Recommendations */}
          <Card className="bg-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Carreras Recomendadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.careers.map((career, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Score Breakdown */}
        <Card className="bg-card shadow-card border-0 mb-8">
          <CardHeader>
            <CardTitle>Desglose de Puntuaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedScores.map(({ profile: profileKey, score, data }, index) => (
                <div key={profileKey} className="flex items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-8 h-8 rounded-full ${data.color} flex items-center justify-center`}>
                      <data.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{data.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(score / Math.max(...Object.values(result.scores))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{score}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-accent shadow-card border-0 mb-8">
          <CardHeader>
            <CardTitle>Próximos Pasos Sugeridos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Desarrollo de Habilidades</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Realiza cursos especializados en tu área de interés</li>
                  <li>• Explora plataformas como Udemy, Coursera y LinkedIn Learning</li>
                  <li>• Practica con proyectos reales para ganar experiencia</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Construcción de Carrera</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Construye un portafolio profesional</li>
                  <li>• Únete a comunidades de tu área profesional</li>
                  <li>• Busca mentores y oportunidades de networking</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">¡El primer paso hacia tu futuro profesional comienza ahora!</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onRetake}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Repetir Test
            </Button>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => window.open('https://tobless.me', '_blank')}
            >
              Visitar Tobless.me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
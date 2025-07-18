import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestResult, TestProfile } from './VocationalTest';

interface TestFormProps {
  onComplete: (result: TestResult) => void;
}

const testQuestions = [
  {
    section: "Habilidades Técnicas",
    questions: [
      {
        id: 1,
        question: "¿Qué nivel de experiencia tienes en el uso de herramientas digitales?",
        options: [
          "Nunca he usado herramientas digitales",
          "Básico: Uso algunas herramientas básicas",
          "Intermedio: Uso herramientas como Google Drive, Excel, etc.",
          "Avanzado: Uso herramientas especializadas"
        ]
      },
      {
        id: 2,
        question: "¿Tienes experiencia en algún área de la tecnología?",
        options: [
          "Desarrollo web o programación",
          "Diseño gráfico o UX/UI",
          "Marketing digital o gestión de redes sociales",
          "Ninguna de las anteriores"
        ]
      },
      {
        id: 3,
        question: "¿Tienes experiencia gestionando campañas publicitarias?",
        options: [
          "No, nunca",
          "Sí, he creado algunas campañas",
          "Sí, tengo experiencia gestionando campañas",
          "Soy experto en estas plataformas"
        ]
      },
      {
        id: 4,
        question: "¿Hablas algún idioma además del español?",
        options: [
          "No",
          "Inglés básico",
          "Inglés avanzado",
          "Múltiples idiomas"
        ]
      }
    ]
  },
  {
    section: "Habilidades Blandas",
    questions: [
      {
        id: 5,
        question: "¿Cómo te consideras en términos de comunicación?",
        options: [
          "Prefiero comunicarme por escrito",
          "Me gusta hablar directamente",
          "Me adapto según la situación",
          "No me siento cómodo comunicando"
        ]
      },
      {
        id: 6,
        question: "¿Qué tan organizado/a eres?",
        options: [
          "Necesito mejorar mucho",
          "Soy algo organizado/a",
          "Soy bastante organizado/a",
          "Soy extremadamente organizado/a"
        ]
      },
      {
        id: 7,
        question: "¿Qué tan importante es la creatividad en tu trabajo?",
        options: [
          "No me interesa mucho",
          "A veces, dependiendo del trabajo",
          "Es importante para mí",
          "Es fundamental para mí"
        ]
      },
      {
        id: 8,
        question: "¿Cómo manejas los plazos bajo presión?",
        options: [
          "Me estreso mucho",
          "Intento terminar a tiempo",
          "Puedo manejar los plazos bien",
          "Trabajo mejor bajo presión"
        ]
      }
    ]
  },
  {
    section: "Personalidad para Trabajo Remoto",
    questions: [
      {
        id: 9,
        question: "¿Qué tan cómodo te sientes trabajando de forma autónoma?",
        options: [
          "Prefiero supervisión constante",
          "Me adapto con algo de guía",
          "Trabajo bien independiente",
          "Me encanta la autonomía total"
        ]
      },
      {
        id: 10,
        question: "¿Qué tan flexible eres con cambios de última hora?",
        options: [
          "Me cuesta adaptarme",
          "Necesito tiempo para ajustarme",
          "Puedo adaptarme si es necesario",
          "Soy muy flexible"
        ]
      },
      {
        id: 11,
        question: "¿Cómo manejas los errores en el trabajo?",
        options: [
          "Me siento frustrado",
          "Intento aprender de ellos",
          "Los veo como oportunidad",
          "Me motiva a mejorar"
        ]
      },
      {
        id: 12,
        question: "¿Cómo te sientes trabajando en equipo remoto?",
        options: [
          "Prefiero trabajar solo",
          "Me gusta sin demasiada interacción",
          "Disfruto colaborando a distancia",
          "Me gusta liderar equipos"
        ]
      }
    ]
  },
  {
    section: "Preferencias Personales",
    questions: [
      {
        id: 13,
        question: "¿Qué tipo de tareas disfrutas más?",
        options: [
          "Tareas repetitivas y estructuradas",
          "Tareas creativas y variadas",
          "Tareas de interacción social",
          "Tareas técnicas y analíticas"
        ]
      },
      {
        id: 14,
        question: "¿Prefieres empresa grande o proyecto pequeño?",
        options: [
          "Empresa grande y estable",
          "Ambas opciones",
          "Proyecto pequeño y flexible",
          "Mi propio negocio"
        ]
      },
      {
        id: 15,
        question: "¿Qué actividad te atrae más?",
        options: [
          "Crear contenido visual",
          "Resolver problemas y analizar datos",
          "Organizar y administrar proyectos",
          "Ayudar a otros a mejorar"
        ]
      },
      {
        id: 16,
        question: "¿Qué tan dispuesto estás a aprender nuevas habilidades?",
        options: [
          "No tengo mucho tiempo",
          "A mi propio ritmo",
          "Frecuentemente motivado",
          "Completamente comprometido"
        ]
      }
    ]
  }
];

// Algoritmo de puntuación basado en las respuestas
const calculateProfile = (answers: Record<number, number>): TestResult => {
  const scores: Record<TestProfile, number> = {
    creative: 0,
    logical: 0,
    support: 0,
    leader: 0,
    empathetic: 0,
    trafficker: 0
  };

  // Matriz de puntuación para cada pregunta y opción
  const scoreMatrix: Record<number, Record<TestProfile, number>[]> = {
    1: [
      { creative: 0, logical: 0, support: 1, leader: 0, empathetic: 0, trafficker: 0 },
      { creative: 1, logical: 1, support: 2, leader: 0, empathetic: 1, trafficker: 0 },
      { creative: 2, logical: 2, support: 1, leader: 1, empathetic: 1, trafficker: 1 },
      { creative: 1, logical: 3, support: 1, leader: 2, empathetic: 0, trafficker: 3 }
    ],
    2: [
      { creative: 0, logical: 3, support: 0, leader: 1, empathetic: 0, trafficker: 2 },
      { creative: 3, logical: 1, support: 1, leader: 1, empathetic: 1, trafficker: 0 },
      { creative: 2, logical: 1, support: 2, leader: 2, empathetic: 2, trafficker: 3 },
      { creative: 0, logical: 0, support: 1, leader: 0, empathetic: 1, trafficker: 0 }
    ],
    3: [
      { creative: 0, logical: 0, support: 1, leader: 0, empathetic: 0, trafficker: 0 },
      { creative: 1, logical: 1, support: 1, leader: 1, empathetic: 1, trafficker: 2 },
      { creative: 1, logical: 2, support: 1, leader: 2, empathetic: 1, trafficker: 3 },
      { creative: 0, logical: 2, support: 0, leader: 2, empathetic: 0, trafficker: 4 }
    ],
    4: [
      { creative: 0, logical: 0, support: 1, leader: 0, empathetic: 0, trafficker: 0 },
      { creative: 1, logical: 1, support: 1, leader: 1, empathetic: 1, trafficker: 1 },
      { creative: 1, logical: 2, support: 1, leader: 2, empathetic: 1, trafficker: 2 },
      { creative: 2, logical: 2, support: 1, leader: 3, empathetic: 2, trafficker: 2 }
    ],
    5: [
      { creative: 1, logical: 2, support: 2, leader: 0, empathetic: 0, trafficker: 1 },
      { creative: 1, logical: 1, support: 1, leader: 2, empathetic: 2, trafficker: 1 },
      { creative: 2, logical: 1, support: 2, leader: 2, empathetic: 2, trafficker: 1 },
      { creative: 0, logical: 0, support: 0, leader: 0, empathetic: 0, trafficker: 0 }
    ],
    6: [
      { creative: 0, logical: 0, support: 0, leader: 0, empathetic: 1, trafficker: 0 },
      { creative: 1, logical: 1, support: 2, leader: 1, empathetic: 1, trafficker: 1 },
      { creative: 1, logical: 2, support: 3, leader: 2, empathetic: 1, trafficker: 2 },
      { creative: 1, logical: 3, support: 3, leader: 3, empathetic: 1, trafficker: 3 }
    ],
    7: [
      { creative: 0, logical: 2, support: 1, leader: 1, empathetic: 0, trafficker: 1 },
      { creative: 2, logical: 1, support: 1, leader: 1, empathetic: 1, trafficker: 1 },
      { creative: 3, logical: 1, support: 1, leader: 2, empathetic: 2, trafficker: 1 },
      { creative: 4, logical: 0, support: 1, leader: 2, empathetic: 3, trafficker: 0 }
    ],
    8: [
      { creative: 0, logical: 0, support: 1, leader: 0, empathetic: 1, trafficker: 0 },
      { creative: 1, logical: 1, support: 2, leader: 1, empathetic: 1, trafficker: 1 },
      { creative: 1, logical: 2, support: 2, leader: 2, empathetic: 1, trafficker: 2 },
      { creative: 2, logical: 2, support: 1, leader: 3, empathetic: 1, trafficker: 3 }
    ],
    9: [
      { creative: 0, logical: 0, support: 2, leader: 0, empathetic: 1, trafficker: 0 },
      { creative: 1, logical: 1, support: 2, leader: 1, empathetic: 1, trafficker: 1 },
      { creative: 2, logical: 2, support: 1, leader: 2, empathetic: 1, trafficker: 2 },
      { creative: 2, logical: 2, support: 0, leader: 4, empathetic: 1, trafficker: 3 }
    ],
    10: [
      { creative: 0, logical: 1, support: 1, leader: 0, empathetic: 0, trafficker: 0 },
      { creative: 1, logical: 1, support: 2, leader: 1, empathetic: 1, trafficker: 1 },
      { creative: 2, logical: 2, support: 2, leader: 2, empathetic: 1, trafficker: 2 },
      { creative: 3, logical: 2, support: 1, leader: 3, empathetic: 2, trafficker: 2 }
    ],
    11: [
      { creative: 0, logical: 0, support: 1, leader: 0, empathetic: 0, trafficker: 0 },
      { creative: 1, logical: 2, support: 2, leader: 1, empathetic: 1, trafficker: 1 },
      { creative: 2, logical: 2, support: 2, leader: 2, empathetic: 2, trafficker: 2 },
      { creative: 2, logical: 2, support: 1, leader: 3, empathetic: 2, trafficker: 3 }
    ],
    12: [
      { creative: 1, logical: 2, support: 1, leader: 0, empathetic: 0, trafficker: 1 },
      { creative: 2, logical: 2, support: 2, leader: 1, empathetic: 1, trafficker: 2 },
      { creative: 2, logical: 2, support: 2, leader: 2, empathetic: 3, trafficker: 2 },
      { creative: 1, logical: 1, support: 1, leader: 4, empathetic: 2, trafficker: 2 }
    ],
    13: [
      { creative: 0, logical: 2, support: 3, leader: 1, empathetic: 1, trafficker: 1 },
      { creative: 4, logical: 1, support: 1, leader: 2, empathetic: 2, trafficker: 1 },
      { creative: 2, logical: 1, support: 2, leader: 2, empathetic: 4, trafficker: 1 },
      { creative: 1, logical: 4, support: 1, leader: 2, empathetic: 1, trafficker: 3 }
    ],
    14: [
      { creative: 0, logical: 1, support: 2, leader: 0, empathetic: 1, trafficker: 1 },
      { creative: 1, logical: 1, support: 2, leader: 1, empathetic: 1, trafficker: 1 },
      { creative: 2, logical: 1, support: 1, leader: 2, empathetic: 2, trafficker: 1 },
      { creative: 2, logical: 2, support: 0, leader: 4, empathetic: 1, trafficker: 2 }
    ],
    15: [
      { creative: 4, logical: 1, support: 1, leader: 1, empathetic: 2, trafficker: 1 },
      { creative: 1, logical: 4, support: 1, leader: 2, empathetic: 1, trafficker: 3 },
      { creative: 1, logical: 2, support: 4, leader: 2, empathetic: 1, trafficker: 2 },
      { creative: 2, logical: 1, support: 2, leader: 3, empathetic: 4, trafficker: 1 }
    ],
    16: [
      { creative: 0, logical: 1, support: 1, leader: 0, empathetic: 1, trafficker: 0 },
      { creative: 1, logical: 1, support: 2, leader: 1, empathetic: 2, trafficker: 1 },
      { creative: 2, logical: 2, support: 2, leader: 2, empathetic: 2, trafficker: 2 },
      { creative: 3, logical: 3, support: 2, leader: 3, empathetic: 2, trafficker: 3 }
    ]
  };

  // Calcular puntuaciones
  Object.entries(answers).forEach(([questionId, answerIndex]) => {
    const qId = parseInt(questionId);
    const matrix = scoreMatrix[qId];
    if (matrix && matrix[answerIndex]) {
      Object.entries(matrix[answerIndex]).forEach(([profile, points]) => {
        scores[profile as TestProfile] += points;
      });
    }
  });

  // Determinar el perfil con mayor puntuación
  const maxScore = Math.max(...Object.values(scores));
  const topProfile = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as TestProfile;

  return {
    profile: topProfile,
    scores
  };
};

export const TestForm = ({ onComplete }: TestFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  const totalQuestions = testQuestions.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentSection < testQuestions.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = () => {
    const result = calculateProfile(answers);
    onComplete(result);
  };

  const currentSectionData = testQuestions[currentSection];
  const isLastSection = currentSection === testQuestions.length - 1;
  const canProceed = currentSectionData.questions.every(q => answers[q.id] !== undefined);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Test Vocacional Integral</h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-sm text-muted-foreground">
              Sección {currentSection + 1} de {testQuestions.length}
            </span>
            <Progress value={progress} className="w-64" />
            <span className="text-sm text-muted-foreground">
              {answeredQuestions}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* Section */}
        <Card className="bg-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              {currentSectionData.section}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {currentSectionData.questions.map((question) => (
              <div key={question.id} className="space-y-4">
                <h3 className="text-lg font-medium">{question.question}</h3>
                <RadioGroup
                  value={answers[question.id]?.toString() || ""}
                  onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`q${question.id}-${index}`} />
                      <Label htmlFor={`q${question.id}-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentSection === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <div className="flex space-x-2">
            {testQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSection ? 'bg-primary' : 
                  index < currentSection ? 'bg-primary/50' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {isLastSection ? (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Ver Resultados
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
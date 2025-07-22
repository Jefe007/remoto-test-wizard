import { useState } from 'react';
import { TestForm } from './TestForm';
import { ResultsSection } from './ResultsSection';
import { UserInfoForm } from './UserInfoForm';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, Target, Users, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-vocational-test.jpg';

export type TestProfile = 'creative' | 'logical' | 'support' | 'leader' | 'empathetic' | 'trafficker';

export interface TestResult {
  profile: TestProfile;
  scores: Record<TestProfile, number>;
}

export const VocationalTest = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'userInfo' | 'test' | 'results'>('intro');
  const [result, setResult] = useState<TestResult | null>(null);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);

  const handleStartTest = () => {
    setCurrentStep('userInfo');
  };

  const handleUserInfoSubmit = (name: string, email: string) => {
    setUserInfo({ name, email });
    setCurrentStep('test');
  };

  const handleTestComplete = (testResult: TestResult) => {
    setResult(testResult);
    setCurrentStep('results');
  };

  const handleRetakeTest = () => {
    setResult(null);
    setCurrentStep('intro');
  };

  if (currentStep === 'userInfo') {
    return (
      <div className="min-h-screen bg-background">
        <UserInfoForm onSubmit={handleUserInfoSubmit} />
      </div>
    );
  }

  if (currentStep === 'test') {
    return (
      <div className="min-h-screen bg-background">
        <TestForm onComplete={handleTestComplete} />
      </div>
    );
  }

  if (currentStep === 'results' && result) {
    return (
      <div className="min-h-screen bg-background">
        <ResultsSection result={result} onRetake={handleRetakeTest} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/40">
          <img 
            src={heroImage} 
            alt="Profesionales trabajando remotamente" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Test Vocacional Integral
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Para el Trabajo Remoto
            </p>
            <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
              Descubre tus fortalezas y debilidades en relación a diversas áreas del trabajo remoto. 
              Recibe recomendaciones personalizadas para el desarrollo de tu carrera digital.
            </p>
            <Button 
              onClick={handleStartTest}
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-glow"
            >
              Comenzar Test
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              ¿Qué descubrirás con este test?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card shadow-card border-0">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Habilidades Técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Evalúa tu nivel en herramientas digitales y tecnologías
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-card border-0">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Habilidades Blandas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Analiza tu comunicación, organización y creatividad
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-card border-0">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Personalidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Identifica tu estilo de trabajo y preferencias
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-card border-0">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Recomendaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Recibe un plan personalizado para tu desarrollo profesional
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              ¡El primer paso hacia tu futuro profesional comienza ahora!
            </h2>
            <p className="text-muted-foreground mb-8">
              Completa el test en menos de 10 minutos y descubre cuál es tu perfil ideal para el trabajo remoto.
            </p>
            <Button 
              onClick={handleStartTest}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
            >
              Comenzar Test Ahora
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
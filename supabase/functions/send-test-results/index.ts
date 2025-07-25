import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, name, result } = await req.json()

    const profileData = {
      creative: {
        title: "Perfil Creativo y Comunicador",
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
    }

    const profile = profileData[result.profile] || {
      title: 'Perfil Desconocido',
      description: '',
      strengths: [],
      areasToLearn: [],
      careers: []
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #2563eb; text-align: center; margin-bottom: 30px;">Resultados de tu Test Vocacional para Trabajo Remoto</h2>
        
        <p style="font-size: 16px; line-height: 1.5;">Hola <strong>${name}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.5;">¡Gracias por completar nuestro test vocacional! Aquí tienes tus resultados detallados:</p>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0; font-size: 24px;">${profile.title}</h3>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${profile.description}</p>
        </div>
        
        <div style="margin: 30px 0;">
          <h4 style="color: #2563eb; font-size: 18px; margin-bottom: 15px;">🌟 Tus Fortalezas:</h4>
          <ul style="list-style: none; padding: 0;">
            ${profile.strengths.map(strength => `<li style="background: #f1f5f9; padding: 8px 12px; margin: 5px 0; border-radius: 5px; border-left: 4px solid #2563eb;">• ${strength}</li>`).join('')}
          </ul>
        </div>
        
        <div style="margin: 30px 0;">
          <h4 style="color: #2563eb; font-size: 18px; margin-bottom: 15px;">📈 Áreas Recomendadas para Trabajar:</h4>
          <ul style="list-style: none; padding: 0;">
            ${profile.areasToLearn.map(area => `<li style="background: #ecfdf5; padding: 8px 12px; margin: 5px 0; border-radius: 5px; border-left: 4px solid #10b981;">→ ${area}</li>`).join('')}
          </ul>
        </div>
        
        <div style="margin: 30px 0;">
          <h4 style="color: #2563eb; font-size: 18px; margin-bottom: 15px;">💼 Carreras Recomendadas:</h4>
          <ul style="list-style: none; padding: 0;">
            ${profile.careers.map(career => `<li style="background: #fef3c7; padding: 8px 12px; margin: 5px 0; border-radius: 5px; border-left: 4px solid #f59e0b;">🎯 ${career}</li>`).join('')}
          </ul>
        </div>
        
        <div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 10px;">
          <h4 style="color: #2563eb; font-size: 18px; margin-bottom: 15px;">📊 Tus Puntuaciones por Área:</h4>
          <div style="display: grid; gap: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <span><strong>Creativo:</strong></span>
              <span style="background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${result.scores.creative || 0}%</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <span><strong>Lógico:</strong></span>
              <span style="background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${result.scores.logical || 0}%</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <span><strong>Apoyo:</strong></span>
              <span style="background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${result.scores.support || 0}%</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <span><strong>Liderazgo:</strong></span>
              <span style="background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${result.scores.leader || 0}%</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <span><strong>Empático:</strong></span>
              <span style="background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${result.scores.empathetic || 0}%</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
              <span><strong>Tráfico:</strong></span>
              <span style="background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${result.scores.trafficker || 0}%</span>
            </div>
          </div>
        </div>
        
        <div style="margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; text-align: center;">
          <h4 style="margin: 0 0 15px 0; font-size: 18px;">🚀 Próximos Pasos</h4>
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">Estos resultados te ayudarán a identificar las mejores oportunidades para tu carrera en el trabajo remoto. ¡El primer paso hacia tu futuro profesional comienza ahora!</p>
          <div style="margin-top: 20px;">
            <a href="https://tobless.me" style="background: white; color: #2563eb; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Visitar Tobless.me</a>
          </div>
        </div>
        
        <p style="text-align: center; color: #64748b; font-size: 14px; margin-top: 30px;">
          ¡Gracias por usar nuestro test vocacional!<br>
          <strong>Tobless</strong> - Tu plataforma para el trabajo remoto
        </p>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Tobless Test Vocacional <hablemos@tobless.me>',
        to: [email],
        subject: `${name}, aquí tienes los resultados de tu test vocacional`,
        html: emailHtml,
      }),
    })

    if (res.ok) {
      const data = await res.json()
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } else {
      const error = await res.text()
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
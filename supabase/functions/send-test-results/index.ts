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

    const profileDescriptions = {
      creative: 'Perfil Creativo',
      logical: 'Perfil Lógico',
      support: 'Perfil de Apoyo',
      leader: 'Perfil de Liderazgo',
      empathetic: 'Perfil Empático',
      trafficker: 'Perfil de Tráfico'
    }

    const profileDescription = profileDescriptions[result.profile] || 'Perfil Desconocido'

    const emailHtml = `
      <h2>Resultados de tu Test Vocacional para Trabajo Remoto</h2>
      <p>Hola ${name},</p>
      <p>¡Gracias por completar nuestro test vocacional! Aquí tienes tus resultados:</p>
      
      <h3>Tu Perfil Principal: ${profileDescription}</h3>
      
      <h4>Tus Puntuaciones por Área:</h4>
      <ul>
        <li><strong>Creativo:</strong> ${result.scores.creative || 0}%</li>
        <li><strong>Lógico:</strong> ${result.scores.logical || 0}%</li>
        <li><strong>Apoyo:</strong> ${result.scores.support || 0}%</li>
        <li><strong>Liderazgo:</strong> ${result.scores.leader || 0}%</li>
        <li><strong>Empático:</strong> ${result.scores.empathetic || 0}%</li>
        <li><strong>Tráfico:</strong> ${result.scores.trafficker || 0}%</li>
      </ul>
      
      <p>Estos resultados te ayudarán a identificar las mejores oportunidades para tu carrera en el trabajo remoto.</p>
      
      <p>¡Gracias por usar nuestro test vocacional!</p>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Test Vocacional <no-reply@tu-dominio.com>',
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
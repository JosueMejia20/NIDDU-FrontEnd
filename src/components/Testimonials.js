import React from 'react';
import '../styles/components/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: '"NIDDU ha sido un salvavidas para mi y mi perro Max. Los paseadores son muy confiables y Max siempre regresa feliz de sus paseos. ¡Totalmente recomendado!"',
      author: 'María González',
      role: 'Dueña de Max',
      avatar: 'M'
    },
    {
      id: 2,
      content: '"Como dueño de un gato con necesidades especiales, encontrar a alguien de confianza era difícil. Con NIDDU encontré a una cuidadora excelente que viene a mi casa cuando viajo."',
      author: 'Carlos Rodríguez',
      role: 'Dueño de Simba',
      avatar: 'C'
    },
    {
      id: 3,
      content: '"El servicio de day-care ha sido increíble para mi cachorro. No solo lo cuidan, sino que también socializa con otros perros. La aplicación es muy fácil de usar y el pago es seguro."',
      author: 'Ana Martínez',
      role: 'Dueña de Toby',
      avatar: 'A'
    }
  ];

  return (
    <section className="testimonials" id="testimonios">
      <div className="container">
        <div className="section-title">
          <h2>Lo que Dicen Nuestros Clientes</h2>
          <p>Miles de dueños de mascotas confían en NIDDU</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="testimonial-card animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="testimonial-content">
                <p>{testimonial.content}</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
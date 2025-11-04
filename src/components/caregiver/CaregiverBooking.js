import React, { useState } from 'react';
import '../../styles/caregiver/CaregiverBookings.css';

const CaregiverBookings = ({ onSectionChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const bookings = [
    {
      id: 'RES-001',
      status: 'pending',
      client: {
        name: 'Carlos Rodríguez',
        phone: '+57 300 123 4567',
        address: 'Calle 123 #45-67, Bogotá',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
      },
      service: {
        name: 'Day Care Diario',
        pet: 'Max (Golden Retriever, 3 años)',
        date: '15 Nov 2023 - 08:00 a 16:00',
        notes: 'Max es juguetón, necesita paseos cada 3 horas'
      },
      pricing: [
        { item: 'Day Care (8 horas)', amount: '$200,000' },
        { item: 'Servicio adicional', amount: '$50,000' },
        { item: 'Total', amount: '$250,000', total: true }
      ]
    },
    {
      id: 'RES-002',
      status: 'confirmed',
      client: {
        name: 'María López',
        phone: '+57 301 987 6543',
        address: 'Carrera 89 #12-34, Bogotá',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
      },
      service: {
        name: 'Paseo Personalizado',
        pet: 'Luna (Siamés, 2 años)',
        date: '16 Nov 2023 - 16:00 a 17:00',
        notes: 'Luna es asustadiza, evitar ruidos fuertes'
      },
      pricing: [
        { item: 'Paseo (1 hora)', amount: '$15,000' },
        { item: 'Total', amount: '$15,000', total: true }
      ]
    }
  ];

  const handleAcceptBooking = (bookingId) => {
    if (confirm('¿Estás seguro de que quieres aceptar esta reserva?')) {
      alert(`Reserva ${bookingId} aceptada exitosamente`);
    }
  };

  const handleRejectBooking = (bookingId) => {
    if (confirm('¿Estás seguro de que quieres rechazar esta reserva?')) {
      alert(`Reserva ${bookingId} rechazada`);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = activeFilter === 'all' || booking.status === activeFilter;
    const matchesSearch = booking.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.pet.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="caregiver-bookings">
      <div className="container">
        <div className="page-header">
          <button className="btn-back" onClick={() => onSectionChange('dashboard')}>
            <i className="fas fa-arrow-left"></i> Volver al Dashboard
          </button>
          <h1>Gestión de Reservas</h1>
          <p>Administra todas tus reservas activas y pasadas</p>
        </div>

        {/* Filtros */}
        <div className="bookings-filters">
          <div className="filter-tabs">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(filter => (
              <button
                key={filter}
                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'all' ? 'Todas' : 
                 filter === 'pending' ? 'Pendientes' :
                 filter === 'confirmed' ? 'Confirmadas' :
                 filter === 'completed' ? 'Completadas' : 'Canceladas'}
              </button>
            ))}
          </div>
          
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Buscar por cliente o mascota..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Lista de Reservas */}
        <div className="bookings-container">
          {filteredBookings.map(booking => (
            <div key={booking.id} className={`booking-card ${booking.status}`}>
              <div className="booking-header">
                <div className="booking-id">#{booking.id}</div>
                <div className={`booking-status ${booking.status}`}>
                  {booking.status === 'pending' ? 'Pendiente de Confirmación' : 'Confirmada'}
                </div>
              </div>
              
              <div className="booking-content">
                <div className="client-info">
                  <div className="client-avatar">
                    <img src={booking.client.avatar} alt={booking.client.name} />
                  </div>
                  <div className="client-details">
                    <h4>{booking.client.name}</h4>
                    <p><i className="fas fa-phone"></i> {booking.client.phone}</p>
                    <p><i className="fas fa-map-marker-alt"></i> {booking.client.address}</p>
                  </div>
                </div>

                <div className="service-info">
                  <h4>{booking.service.name}</h4>
                  <div className="service-details">
                    <p><i className="fas fa-paw"></i> <strong>Mascota:</strong> {booking.service.pet}</p>
                    <p><i className="fas fa-clock"></i> <strong>Fecha:</strong> {booking.service.date}</p>
                    <p><i className="fas fa-info-circle"></i> <strong>Notas:</strong> {booking.service.notes}</p>
                  </div>
                </div>

                <div className="booking-pricing">
                  <div className="price-breakdown">
                    {booking.pricing.map((price, index) => (
                      <div key={index} className={price.total ? 'price-total' : 'price-item'}>
                        <span>{price.item}</span>
                        <span>{price.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="booking-actions">
                {booking.status === 'pending' ? (
                  <>
                    <button className="btn btn-success" onClick={() => handleAcceptBooking(booking.id)}>
                      <i className="fas fa-check"></i> Aceptar
                    </button>
                    <button className="btn btn-outline" onClick={() => handleRejectBooking(booking.id)}>
                      <i className="fas fa-times"></i> Rechazar
                    </button>
                    <button className="btn btn-secondary">
                      <i className="fas fa-comment"></i> Mensaje
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary">
                      <i className="fas fa-edit"></i> Modificar
                    </button>
                    <button className="btn btn-outline">
                      <i className="fas fa-times"></i> Cancelar
                    </button>
                    <button className="btn btn-success">
                      <i className="fas fa-check-circle"></i> Completar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaregiverBookings;
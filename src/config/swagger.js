import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RideFlow Car Rental API',
      version: '1.0.0',
      description: 'Production API for a professional car rental and marketplace platform. Built with Node.js, Express, PostgreSQL, and MongoDB.',
      contact: {
        name: 'RideFlow Support',
        email: 'support@rideflow.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
        description: 'Local development server',
      },
      {
        url: 'https://upbeat-smile-production.up.railway.app/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token. Get it from POST /auth/login',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            firstName: { type: 'string', example: 'Sara' },
            lastName: { type: 'string', example: 'Test' },
            email: { type: 'string', example: 'sara@example.com' },
            phone: { type: 'string', example: '+251911000001' },
            role: { type: 'string', enum: ['customer', 'sales_agent', 'admin'], example: 'customer' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Vehicle: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a1fc6ff5700751f741f8e89' },
            make: { type: 'string', example: 'Toyota' },
            model: { type: 'string', example: 'Camry' },
            year: { type: 'integer', example: 2023 },
            pricePerDay: { type: 'number', example: 85 },
            currency: { type: 'string', example: 'EUR' },
            category: { type: 'string', enum: ['economy', 'compact', 'suv', 'luxury', 'van', 'electric', 'convertible'] },
            fuelType: { type: 'string', enum: ['petrol', 'diesel', 'electric', 'hybrid'] },
            transmission: { type: 'string', enum: ['manual', 'automatic'] },
            seats: { type: 'integer', example: 5 },
            isAvailable: { type: 'boolean', example: true },
            location: { type: 'string', example: 'Berlin, Germany' },
            images: { type: 'array', items: { type: 'object', properties: { url: { type: 'string' }, publicId: { type: 'string' } } } },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            vehicleId: { type: 'string', example: '6a1fc6ff5700751f741f8e89' },
            startDate: { type: 'string', format: 'date', example: '2026-07-01' },
            endDate: { type: 'string', format: 'date', example: '2026-07-05' },
            totalDays: { type: 'integer', example: 4 },
            pricePerDay: { type: 'number', example: 85 },
            totalPrice: { type: 'number', example: 340 },
            currency: { type: 'string', example: 'EUR' },
            status: { type: 'string', enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'] },
            notes: { type: 'string', example: 'Please have the car ready by 9am' },
          },
        },
        Inquiry: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a1ff7aee762d9949f52b94c' },
            vehicleId: { type: 'string', example: '6a1fc6ff5700751f741f8e89' },
            subject: { type: 'string', example: 'Question about the car' },
            message: { type: 'string', example: 'Does this car have air conditioning?' },
            status: { type: 'string', enum: ['open', 'in_progress', 'resolved', 'closed'] },
            replies: { type: 'array', items: { type: 'object' } },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Something went wrong' },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation successful' },
            data: { type: 'object' },
          },
        },
      },
    },
  },
  apis: ['./src/modules/**/*.routes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
# ✈️ Advanced Microservices-Based Airline Booking System

The **Advanced Microservices-Based Airline Booking System** is designed to manage and automate the process of flight reservations, from booking to confirmation. It leverages a microservices architecture to ensure scalability, performance, and fault tolerance, all while providing a seamless experience for users. This system integrates **API Gateway**, **Booking Service**, **Flight Service**, and **Mailer Service** to deliver a robust and efficient booking platform.

## Project Overview

### Microservices Architecture & Scalability
This airline booking system is built using a **microservices architecture**, where each service is independently deployable, ensuring high scalability and flexibility. The architecture is designed to be horizontally scalable, which allows the system to handle growing traffic with minimal downtime. By using AWS for deployment, we ensure that the system is not only scalable but also fault-tolerant, leveraging AWS services such as auto-scaling, load balancing, and monitoring tools to maintain high availability and performance.

### API Gateway
The **API Gateway** is the central entry point for all incoming requests. It is responsible for:
- **Authentication & Authorization:** Handles user authentication via JWT tokens and ensures that requests are routed to appropriate services based on user roles and permissions.
- **Routing:** The API Gateway acts as a reverse proxy, routing requests to the appropriate microservice, ensuring separation of concerns and ease of management.
- **User & Role Management:** Manages user creation, updates, and role assignments to secure access to the system's resources.

### Flight Service
The **Flight Service** manages flight-related operations. It provides:
- **Flight Management:** CRUD operations for adding, updating, and deleting flights, including the addition of airports, airplanes, and cities.
- **Data Management:** Efficient management of flight-related data ensures that new flights and updates to existing flights are handled in real-time with minimal delay.
- **Flexible Operations:** Users can query flights based on different parameters like destination, date, and availability, all of which are handled by this service.

### Booking Service
The **Booking Service** is responsible for managing flight reservations. It includes:
- **Booking Management:** Handles flight bookings, including seat selection, and ensures that the booking process is efficient and accurate.
- **Concurrency Control:** Implements sophisticated mechanisms for handling concurrent bookings, ensuring data consistency and preventing race conditions.
- **Message Queue Integration:** Once a booking is made, the system publishes a message to a **RabbitMQ** queue for further processing by the **Mailer Service**.

### Mailer Service
The **Mailer Service** listens for booking confirmation messages from the RabbitMQ queue. It performs the following tasks:
- **Email Notification:** Sends an email to users, confirming their flight booking with detailed information such as flight time, seat number, and booking reference.
- **Asynchronous Processing:** The service processes email notifications asynchronously, ensuring that the booking service remains fast and responsive.

## Tech Stack

- **Languages:** JavaScript, Node.js
- **Frameworks:** Express, Fastify (for high-performance services)
- **Authentication:** JWT for secure token-based authentication
- **Password Encryption:** bcrypt for user password security
- **Message Queue:** RabbitMQ for asynchronous messaging between services
- **Database:** MySQL/PostgreSQL for storing flight and user data
- **Deployment:** AWS for cloud infrastructure, auto-scaling, and high availability

## Key Features
- **Scalable Microservices:** Each service can be independently scaled to handle varying loads, ensuring high availability and performance.
- **User Authentication & Role Management:** Secure user access and manage roles to ensure appropriate permissions for each user.
- **Efficient Flight Management:** Comprehensive flight operations, including CRUD functionalities for managing flights, airports, and related entities.
- **Asynchronous Email Notifications:** Booking confirmations are processed asynchronously through RabbitMQ, enabling real-time and reliable notifications to users.

---

This system is designed to handle complex airline booking scenarios with ease and efficiency, while ensuring that the services remain decoupled and scalable. By using modern cloud infrastructure and microservices principles, it guarantees high performance, fault tolerance, and seamless user experiences.

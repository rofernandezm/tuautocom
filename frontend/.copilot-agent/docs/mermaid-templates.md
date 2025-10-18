# Mermaid Diagram Templates

## Flowchart Templates

### Basic Process Flow
```mermaid
flowchart TD
    A["Start"] --> B["Process Step"]
    B --> C{"Decision Point"}
    C -->|Yes| D["Action A"]
    C -->|No| E["Action B"]
    D --> F["End"]
    E --> F
```

### User Authentication Flow
```mermaid
flowchart TD
    A["User Login"] --> B["Validate Credentials"]
    B --> C{"Valid?"}
    C -->|Yes| D["Generate JWT"]
    C -->|No| E["Show Error"]
    D --> F["Redirect to Dashboard"]
    E --> A
    F --> G["Access Protected Resources"]
```

### API Request Flow
```mermaid
flowchart LR
    A["Client Request"] --> B["API Gateway"]
    B --> C["Authentication"]
    C --> D{"Authorized?"}
    D -->|Yes| E["Process Request"]
    D -->|No| F["Return 401"]
    E --> G["Database Query"]
    G --> H["Return Response"]
    F --> I["Client Error"]
    H --> I
```

## Sequence Diagrams

### User-API Interaction
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant D as Database
    
    U->>F: Click "Load Data"
    F->>A: GET /api/data
    A->>D: SELECT * FROM table
    D->>A: Return results
    A->>F: JSON response
    F->>U: Display data
```

### Authentication Sequence
```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant A as Auth Server
    participant R as Resource Server
    
    U->>C: Login request
    C->>A: POST /auth/login
    A->>A: Validate credentials
    A->>C: JWT token
    C->>R: API request + token
    R->>A: Validate token
    A->>R: Token valid
    R->>C: Protected resource
    C->>U: Display content
```

## Class Diagrams

### Vehicle System
```mermaid
classDiagram
    class Vehicle {
        +string brand
        +string model
        +number year
        +string color
        +start()
        +stop()
        +getInfo()
    }
    
    class Car {
        +number doors
        +string transmission
        +openTrunk()
        +lockDoors()
    }
    
    class Truck {
        +number capacity
        +string bedType
        +loadCargo()
        +unloadCargo()
    }
    
    class Engine {
        +string type
        +number displacement
        +number horsepower
        +startEngine()
        +stopEngine()
    }
    
    Vehicle <|-- Car
    Vehicle <|-- Truck
    Vehicle "1" --> "1" Engine : has
```

### User Management System
```mermaid
classDiagram
    class User {
        +number id
        +string username
        +string email
        +string password
        +Date createdAt
        +login()
        +logout()
        +updateProfile()
    }
    
    class Role {
        +number id
        +string name
        +string description
        +string[] permissions
    }
    
    class Permission {
        +number id
        +string name
        +string resource
        +string action
    }
    
    User "many" --> "many" Role : has
    Role "many" --> "many" Permission : includes
```

## Entity-Relationship Diagrams

### E-commerce Database
```mermaid
erDiagram
    CUSTOMER {
        int customer_id PK
        string first_name
        string last_name
        string email
        string phone
        date created_at
    }
    
    ORDER {
        int order_id PK
        int customer_id FK
        date order_date
        decimal total_amount
        string status
    }
    
    PRODUCT {
        int product_id PK
        string name
        text description
        decimal price
        int stock_quantity
        string category
    }
    
    ORDER_ITEM {
        int order_item_id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal unit_price
    }
    
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--o{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
```

### Blog System
```mermaid
erDiagram
    USER {
        int user_id PK
        string username
        string email
        string password
        date created_at
    }
    
    POST {
        int post_id PK
        int author_id FK
        string title
        text content
        date published_at
        string status
    }
    
    COMMENT {
        int comment_id PK
        int post_id FK
        int user_id FK
        text content
        date created_at
    }
    
    TAG {
        int tag_id PK
        string name
        string slug
    }
    
    POST_TAG {
        int post_id FK
        int tag_id FK
    }
    
    USER ||--o{ POST : writes
    USER ||--o{ COMMENT : makes
    POST ||--o{ COMMENT : has
    POST ||--o{ POST_TAG : tagged_with
    TAG ||--o{ POST_TAG : tags
```

## Architecture Diagrams

### Microservices Architecture
```mermaid
flowchart TB
    subgraph "Client Layer"
        A[Web App]
        B[Mobile App]
    end
    
    subgraph "API Gateway"
        C[Load Balancer]
    end
    
    subgraph "Microservices"
        D[User Service]
        E[Product Service]
        F[Order Service]
        G[Payment Service]
    end
    
    subgraph "Data Layer"
        H[(User DB)]
        I[(Product DB)]
        J[(Order DB)]
        K[(Payment DB)]
    end
    
    A --> C
    B --> C
    C --> D
    C --> E
    C --> F
    C --> G
    D --> H
    E --> I
    F --> J
    G --> K
```

### CI/CD Pipeline
```mermaid
flowchart LR
    A[Developer] --> B[Git Push]
    B --> C[GitHub Actions]
    C --> D[Run Tests]
    D --> E{"Tests Pass?"}
    E -->|Yes| F[Build Docker Image]
    E -->|No| G[Notify Developer]
    F --> H[Push to Registry]
    H --> I[Deploy to Staging]
    I --> J[Integration Tests]
    J --> K{"Deploy to Prod?"}
    K -->|Yes| L[Production Deploy]
    K -->|No| M[Manual Review]
    G --> A
    M --> A
```

## Special Characters Reference

When using Mermaid in v0 context:
- Use `#43;` for `+` symbol
- Use `#45;` for `-` symbol  
- Use `#61;` for `=` symbol
- Use `#40;` for `(` symbol
- Use `#41;` for `)` symbol
- Always use quotes around node names: `"Node Name"`
export const phasesData = [
  { id: 'phase1', title: 'Phase 1: Core & LLD', subtitle: 'Machine Coding Mastery & Java Fundamentals' },
  { id: 'phase2', title: 'Phase 2: Backend & Systems', subtitle: 'Transactional Safety & Spring Internals' },
  { id: 'phase3', title: 'Phase 3: Cloud & Resiliency', subtitle: 'Distributed Architectures & Azure' },
  { id: 'phase4', title: 'Phase 4: GenAI & Mock', subtitle: 'RAG Pipelines & Interview Simulation' }
];

export const generateTrackerData = () => {
  const tasks = [];
  let idCounter = 1;

  // The curriculum now dictates specific, progressive tasks for Monday-Friday (Days 1-5).
  // Weekends (Days 6-7) automatically fallback to advanced DSA maintenance.
  const curriculum = [
    {
      phaseId: 'phase1',
      weeks: [
        {
          week: "SOLID & Boilerplates",
          dailyTasks: [
            { topic: "SOLID Principles", directive: "Review Single Responsibility & Open/Closed principles. Identify violations in legacy codebases." },
            { topic: "Design Patterns I", directive: "Implement Factory, Strategy, and Observer patterns in Java from scratch." },
            { topic: "Machine Coding Setup", directive: "Create a standard Java boilerplate template (Models, Services, Exceptions) for 90-min timed rounds." },
            { topic: "LLD: Parking Lot Models", directive: "Design class diagrams and associations (Composition vs Aggregation) for a Parking Lot." },
            { topic: "LLD: Parking Lot Logic", directive: "Write the service layer for vehicle allocation. Focus on clean, extensible branching." }
          ]
        },
        {
          week: "Timed Machine Coding",
          dailyTasks: [
            { topic: "Requirement Analysis", directive: "Study the Splitwise problem. Practice extracting core nouns (entities) and verbs (methods) in 10 minutes." },
            { topic: "Data Structures for LLD", directive: "Map domain models to optimal Java collections (e.g., using PriorityQueue for ranking, ConcurrentHashMap for thread safety)." },
            { topic: "Splitwise Implementation", directive: "Implement the exact expense-sharing algorithm (simplify debts) without frameworks." },
            { topic: "Code Extensibility", directive: "Refactor yesterday's code to add a new 'Percentage-based' split strategy without modifying existing logic." },
            { topic: "90-Minute Mock", directive: "Execute a full machine coding problem (e.g., Snake & Ladder) under a strict 90-minute timer. Prioritize compilation." }
          ]
        },
        {
          week: "Distributed Basics",
          dailyTasks: [
            { topic: "CAP Theorem", directive: "Analyze CP vs AP trade-offs. Map these concepts to MongoDB Atlas (CP) vs standard Redis setups." },
            { topic: "Consistent Hashing", directive: "Study how consistent hashing minimizes key redistribution when servers scale up/down." },
            { topic: "Load Balancing", directive: "Compare Round Robin, Least Connections, and IP Hashing. Study Azure APIM traffic routing." },
            { topic: "Database Sharding", directive: "Design a sharding strategy for a multi-tenant Chatbot Platform. Discuss cross-shard joins." },
            { topic: "Whiteboard System Design", directive: "Draw out a high-level architecture for a URL Shortener emphasizing read-heavy traffic." }
          ]
        },
        {
          week: "Java Concurrency",
          dailyTasks: [
            { topic: "Java Memory Model", directive: "Deconstruct the JMM. Understand happens-before relationships and the volatile keyword." },
            { topic: "Locks & Synchronization", directive: "Compare intrinsic locks (synchronized) with ReentrantLocks. Write code to intentionally cause a deadlock." },
            { topic: "Asynchronous Java", directive: "Master CompletableFuture chaining. Handle timeouts and exceptions in non-blocking API calls." },
            { topic: "Executor Framework", directive: "Configure custom Thread Pools. Differentiate CPU-bound (ForkJoinPool) vs I/O-bound sizing strategies." },
            { topic: "Concurrency Debugging", directive: "Analyze thread dumps. Identify thread starvation and livelocks in a sample application." }
          ]
        }
      ]
    },
    {
      phaseId: 'phase2',
      weeks: [
        {
          week: "Transactional Safety",
          dailyTasks: [
            { topic: "Append-Only Ledgers", directive: "Design a digital wallet model. Ensure balances are calculated dynamically from immutable transaction logs." },
            { topic: "Idempotency", directive: "Implement idempotency keys to ensure retried payment webhooks are processed exactly once." },
            { topic: "Atomic Transfers", directive: "Write a thread-safe account-to-account transfer method ensuring both debit and credit succeed or fail together." },
            { topic: "Optimistic vs Pessimistic Locking", directive: "Implement entity versioning to prevent lost updates in concurrent ticket booking scenarios." },
            { topic: "Transactional Mock", directive: "Execute a 90-minute timed machine coding round for an Inventory Reservation System." }
          ]
        },
        {
          week: "Spring MVC vs WebFlux",
          dailyTasks: [
            { topic: "Thread-Per-Request Model", directive: "Deconstruct Tomcat's blocking I/O model. Map its limitations during high-latency third-party API calls." },
            { topic: "Reactive Event Loops", directive: "Study Netty. Understand how non-blocking I/O handles thousands of connections with minimal threads." },
            { topic: "Reactor Context", directive: "Implement thread-safe context passing (like Security/Auth tokens) across asynchronous WebFlux pipelines." },
            { topic: "Java 21 Virtual Threads", directive: "Study Project Loom. Understand how virtual threads decouple app concurrency from OS platform threads." },
            { topic: "Architectural Benchmark", directive: "Draft a comparison document defending when to use standard Spring Boot with Virtual Threads vs WebFlux." }
          ]
        },
        {
          week: "Database Internals",
          dailyTasks: [
            { topic: "Isolation Levels", directive: "Analyze Read Committed vs Repeatable Read vs Serializable. Identify dirty, non-repeatable, and phantom reads." },
            { topic: "B-Tree Indexing", directive: "Explain how composite indexes work. Understand leftmost prefix matching and index selectivity." },
            { topic: "Hibernate Fetch Strategies", directive: "Compare Eager vs Lazy loading. Document when to use each to optimize memory footprint." },
            { topic: "N+1 Query Problem", directive: "Identify N+1 issues in JPA. Resolve them using JOIN FETCH and EntityGraphs." },
            { topic: "Query Optimization", directive: "Drop down to Native Queries or Criteria API to optimize a complex reporting endpoint." }
          ]
        },
        {
          week: "Advanced Backend Resiliency",
          dailyTasks: [
            { topic: "Circuit Breakers", directive: "Configure Resilience4j (Closed, Open, Half-Open). Simulate cascading failure prevention." },
            { topic: "Retry & Backoff", directive: "Implement exponential backoff algorithms to safely handle transient network glitches." },
            { topic: "Rate Limiting & Bulkheads", directive: "Configure token bucket algorithms. Isolate service compartments using the Bulkhead pattern." },
            { topic: "Spring Bean Lifecycle", directive: "Map the exact initialization phases of a Spring Bean, including PostProcessors and proxies." },
            { topic: "Transaction Rollbacks", directive: "Deconstruct how Spring's @Transactional proxy manages connection commits and rollback triggers." }
          ]
        }
      ]
    },
    {
      phaseId: 'phase3',
      weeks: [
        {
          week: "Multi-Tenant Architecture",
          dailyTasks: [
            { topic: "Siloed Architecture", directive: "Design a database-per-tenant isolation model. Discuss TCO and disaster recovery benefits." },
            { topic: "Shared Schema Design", directive: "Implement row-level security and Tenant ID routing for a shared-database approach." },
            { topic: "Connection Pooling Limits", directive: "Analyze HikariCP limits in multi-tenant environments. Calculate max concurrent connections." },
            { topic: "Data Isolation Testing", directive: "Write integration tests ensuring Tenant A can never query Tenant B's data." },
            { topic: "SaaS Design Doc", directive: "Draft an HLD document for a multi-tenant Chatbot platform justifying your chosen schema strategy." }
          ]
        },
        {
          week: "Event-Driven Architecture",
          dailyTasks: [
            { topic: "Kafka Fundamentals", directive: "Study Topics, Partitions, and Consumer Groups. Understand offset management and rebalancing." },
            { topic: "Delivery Semantics", directive: "Compare At-Most-Once, At-Least-Once, and Exactly-Once delivery. Identify the default behavior." },
            { topic: "Idempotent Consumers", directive: "Design a Kafka consumer that utilizes database constraints to safely discard duplicate messages." },
            { topic: "Dead Letter Queues (DLQ)", directive: "Configure a DLQ for poison pill messages. Design an automated retry pipeline." },
            { topic: "Asynchronous HLD", directive: "Design an event-driven Smart IT Service Desk utilizing Kafka to process non-blocking ticket creation." }
          ]
        },
        {
          week: "Security & IAM",
          dailyTasks: [
            { topic: "OAuth 2.0 Flows", directive: "Deconstruct Authorization Code vs Client Credentials flows. Identify the exact actors involved." },
            { topic: "JWT Validation", directive: "Implement stateless JWT validation. Discuss signing algorithms (RS256) and key rotation (JWKS)." },
            { topic: "Azure AD B2C", directive: "Review enterprise authentication configurations. Detail custom user journeys and App Registrations." },
            { topic: "API Gateways", directive: "Configure Azure API Management (APIM) for secure request routing and payload transformation." },
            { topic: "Security Audit Mock", directive: "Audit a sample monolithic architecture and identify points for RBAC and zero-trust enforcement." }
          ]
        },
        {
          week: "High-Level System Design",
          dailyTasks: [
            { topic: "Caching Strategies", directive: "Compare Write-Through, Write-Around, and Write-Back caches. Determine when to invalidate." },
            { topic: "Saga Pattern", directive: "Design a distributed transaction for an E-commerce checkout. Contrast Orchestration vs Choreography." },
            { topic: "HLD: Ride-Sharing App", directive: "Design a system handling high-frequency location updates and driver-rider matching." },
            { topic: "HLD: Ticket Booking", directive: "Design an architecture handling massive, concurrent read/write spikes during flash sales." },
            { topic: "HLD: Chat Application", directive: "Design a real-time messaging system utilizing WebSockets, Redis pub/sub, and Cassandra." }
          ]
        }
      ]
    },
    {
      phaseId: 'phase4',
      weeks: [
        {
          week: "RAG & GenAI Infrastructure",
          dailyTasks: [
            { topic: "Vector Embeddings", directive: "Study high-dimensional embeddings and distance metrics (Cosine Similarity, Euclidean)." },
            { topic: "Data Chunking", directive: "Design optimal document chunking strategies for unstructured data before ingestion." },
            { topic: "Semantic Search", directive: "Query a Vector Database to retrieve contextually relevant chunks for prompt augmentation." },
            { topic: "Semantic Caching", directive: "Document the 3-Tier caching pipeline (Redis/Mongo/Vector DB) to drastically cut GenAI API costs." },
            { topic: "LLM Orchestration", directive: "Design an extensible API layer to orchestrate multiple LLM models for a multi-tenant client base." }
          ]
        },
        {
          week: "Advanced System Mocks",
          dailyTasks: [
            { topic: "HLD Mock I", directive: "Execute a 45-minute timed whiteboard design for a distributed rate limiter." },
            { topic: "HLD Mock II", directive: "Execute a 45-minute timed whiteboard design for a notification delivery system (SMS/Email/Push)." },
            { topic: "LLD Mock I", directive: "Write class structures and schemas for an ATM withdrawal processing system." },
            { topic: "LLD Mock II", directive: "Write class structures and schemas for a Hotel Management System." },
            { topic: "Architecture Review", directive: "Critique your designs. Identify single points of failure and database bottleneck risks." }
          ]
        },
        {
          week: "Behavioral & STAR Method",
          dailyTasks: [
            { topic: "Ownership & Dive Deep", directive: "Draft a STAR response detailing how you decoupled the database for the Ireland NiGas Portal." },
            { topic: "Deliver Results", directive: "Draft a STAR response highlighting the 80% cost reduction achieved by your 3-tier caching pipeline." },
            { topic: "Handling Failure", directive: "Prepare a scenario where a system went down, how you debugged the root cause, and the post-mortem." },
            { topic: "Conflict Resolution", directive: "Document a time you disagreed with a senior engineer or PM regarding an architectural choice." },
            { topic: "Mock Behavioral", directive: "Record yourself answering 3 random behavioral questions. Critique your conciseness and impact metrics." }
          ]
        },
        {
          week: "Full Loop Simulation",
          dailyTasks: [
            { topic: "HLD Simulation", directive: "1-Hour strictly timed High-Level Design mock interview. Speak aloud as you draw." },
            { topic: "LLD Simulation", directive: "1-Hour strictly timed Low-Level Design mock interview. Focus on clean interfaces." },
            { topic: "Machine Coding Mock", directive: "90-Minute strictly timed Machine Coding execution. Compile and run driver code." },
            { topic: "Behavioral Mock", directive: "45-Minute behavioral and resume deep-dive mock." },
            { topic: "Final Polish", directive: "Review all notes, clean up GitHub repositories, and mentally prepare for the transition." }
          ]
        }
      ]
    }
  ];

  // Algorithmic Data Generation
  curriculum.forEach((phase) => {
    phase.weeks.forEach((weekData, weekIndex) => {
      
      // Standardize 7 days per week
      for (let day = 1; day <= 7; day++) {
        const isWeekend = day === 6 || day === 7;
        const weekdayIndex = day - 1; // 0 to 4 for Mon-Fri
        
        let taskTopic = "";
        let taskDirective = "";

        if (isWeekend) {
          // Keep top 5% algorithmic edge sharp over the weekend
          taskTopic = day === 6 ? "DSA: Graph Algorithms & Cycles" : "DSA: Advanced Dynamic Programming";
          taskDirective = `Solve 2 hard LeetCode problems within 60 minutes. Maintain competitive programming speed without sacrificing weekly architecture focus.`;
        } else {
          // Pull the specific, progressive task for this weekday
          taskTopic = weekData.dailyTasks[weekdayIndex].topic;
          taskDirective = weekData.dailyTasks[weekdayIndex].directive;
        }

        tasks.push({
          id: idCounter++,
          phaseId: phase.phaseId,
          dayLabel: `Week ${weekIndex + 1} - Day ${day}`,
          topic: taskTopic,
          directive: taskDirective,
          isCompleted: false
        });
      }
    });
  });

  return tasks;
};
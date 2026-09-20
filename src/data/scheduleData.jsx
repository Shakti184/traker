export const phasesData = [
  { id: 'phase1', title: 'Phase 1: Core & LLD', subtitle: 'Machine Coding Mastery & Java Fundamentals' },
  { id: 'phase2', title: 'Phase 2: Backend & Systems', subtitle: 'Transactional Safety & Spring Internals' },
  { id: 'phase3', title: 'Phase 3: Cloud & Resiliency', subtitle: 'Distributed Architectures & Azure' },
  { id: 'phase4', title: 'Phase 4: GenAI & Mock', subtitle: 'RAG Pipelines & Interview Simulation' }
];

export const generateTrackerData = () => {
  const tasks = [];
  let idCounter = 1;

  const curriculum = [
    {
      phaseId: 'phase1',
      weeks: [
        { topic: "SOLID & Boilerplates", directive: "Set up a standard Java project structure for 90-min Machine Coding rounds. Review Factory and Strategy patterns." },
        { topic: "Timed Machine Coding", directive: "Execute an LLD problem (e.g., Parking Lot or Splitwise) strictly within a 90-minute timer. Prioritize compilation over edge cases." },
        { topic: "Distributed Basics", directive: "Study CAP Theorem, Consistent Hashing, and Load Balancing strategies (Round Robin vs Least Connections)." },
        { topic: "Java Concurrency", directive: "Deep dive into the Java Memory Model, ReentrantLocks vs synchronized, and CompletableFuture chaining." }
      ]
    },
    {
      phaseId: 'phase2',
      weeks: [
        { topic: "Transactional Machine Coding", directive: "Design an append-only digital wallet ledger. Ensure strict idempotency and atomic account-to-account transfers." },
        { topic: "Spring MVC vs WebFlux", directive: "Review the architectural trade-offs between reactive event loops (Netty) and thread-per-request blocking models." },
        { topic: "Database Internals", directive: "Analyze isolation levels (Repeatable Read vs Serializable). Master Hibernate fetch types and the N+1 query problem." },
        { topic: "Java 21 Virtual Threads", directive: "Study how Project Loom virtual threads decouple app concurrency from OS threads, optimizing synchronous CRUD operations." }
      ]
    },
    {
      phaseId: 'phase3',
      weeks: [
        { topic: "Resilience4j", directive: "Configure Circuit Breakers (Closed/Open/Half-Open) and Rate Limiters to handle downstream latency simulation." },
        { topic: "Multi-Tenant Architecture", directive: "Contrast schema-per-tenant vs shared-schema data isolation. Map this to your Automation Chatbot Platform experience." },
        { topic: "Event-Driven Architecture", directive: "Deep dive into Apache Kafka. Design idempotent consumers to handle out-of-order and redelivered webhook messages." },
        { topic: "Security & IAM", directive: "Deconstruct OAuth 2.0 flows and JWT validation. Revisit Azure AD B2C custom policies to articulate enterprise security implementations." }
      ]
    },
    {
      phaseId: 'phase4',
      weeks: [
        { topic: "RAG & Vector Databases", directive: "Study vector embeddings and cosine similarity. Design a highly scalable RAG architecture for unstructured documents." },
        { topic: "GenAI Cost Optimization", directive: "Document your 3-Tier semantic caching pipeline (Redis/MongoDB/Vector DB) to defend token usage and latency reduction in interviews." },
        { topic: "Behavioral (STAR Method)", directive: "Map your Ireland NiGas Portal and TCS integration challenges to Amazon Leadership Principles (Ownership, Dive Deep)." },
        { topic: "Full Loop Simulation", directive: "Conduct a 3-hour continuous mock: 1 hour HLD checkout pipeline, 1.5 hour Machine Coding, 30 min Behavioral." }
      ]
    }
  ];

  curriculum.forEach((phase) => {
    phase.weeks.forEach((weekPattern, weekIndex) => {
      // Generate 7 days for each of the 4 weeks in a phase
      for (let day = 1; day <= 7; day++) {
        const isWeekend = day === 6 || day === 7;
        
        tasks.push({
          id: idCounter++,
          phaseId: phase.phaseId,
          dayLabel: `Week ${weekIndex + 1} - Day ${day}`,
          topic: isWeekend ? `DSA Maintenance & Review` : weekPattern.topic,
          directive: isWeekend 
            ? "Solve 2 hard LeetCode graph or DP problems to maintain your Top 5% competitive edge without sacrificing architecture study time."
            : weekPattern.directive,
          isCompleted: false
        });
      }
    });
  });

  return tasks;
};

import ExperienceImg  from "./assets/PD1G.jpg";
import StockPulseImg  from "./assets/SP_slide1.png";
import SP_slide3      from "./assets/SP_slide3.png";
import SP_slide4      from "./assets/SP_slide4.png";
import SP_slide7      from "./assets/SP_slide7.png";
import SP_slide10     from "./assets/SP_slide10.png";
import EducationImg1  from "./P2.jpg";
import EducationImg2  from "./P1.jpeg";

export const projects = [
    {
        id: 1,
        title: "Survival Analysis of Opening a New Restaurant in Los Angeles",
        description: "The restaurant industry is highly competitive, with a high failure rate for new establishments. Understanding the factors that contribute to restaurant success or failure is crucial for entrepreneurs looking to enter the market.",
        category: "Data Science",
        image: ExperienceImg,
        tags: ["Python", "R", "Survival Analysis", "Cox PH Model", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "Statsmodels", "Jupyter Notebook"],
        year: "2024",
        role: "Data Scientist",
        highlight: "Cox proportional hazards model achieved 80% accuracy in predicting restaurant failure risk by zipcode.",
        demo: "#",
        repo: "#",
        problem: "The restaurant industry is highly competitive, with failure rates exceeding 60% in the first year. Entrepreneurs lack a data-driven way to evaluate location risk before committing capital — relying on intuition over evidence.",
        approach: "Applied Cox proportional hazards survival analysis to model the time until restaurant failure across Los Angeles zipcodes. Collected and engineered features spanning crime rates, neighborhood income, competition density, and operating conditions. Built a composite risk score per zipcode to surface the most predictive signals.",
        solution: "Crime rate and zipcode emerged as the dominant predictors of restaurant failure. A location risk model was built to rank zipcodes by predicted hazard, giving entrepreneurs a quantitative tool to compare potential sites before opening.",
        impact: "The model predicts restaurant failure risk with 80% accuracy. Hazard ratios revealed that high-crime areas carry 12.7× the baseline failure risk — a finding that directly informs site selection strategy for new restaurant owners.",
        keyVariables: [
            {
                title: "Crime Rate",
                sub: "Strongest Risk Factor",
                description: "Higher crime is strongly associated with a much greater chance of business failure — the single most predictive variable in the model.",
                hazardRatio: "12.7",
                insight: "Most dominant factor.",
                type: "risk",
            },
            {
                title: "Total Restaurants",
                sub: "Competition Pressure",
                description: "Areas saturated with existing restaurants show significantly higher failure risk due to market competition.",
                hazardRatio: "3.8",
                insight: "Strong positive risk factor.",
                type: "risk",
            },
            {
                title: "Average Income",
                sub: "Protective Effect",
                description: "Higher neighbourhood income is linked to a modest but consistent reduction in failure risk — wealthier areas sustain restaurants longer.",
                hazardRatio: "0.94",
                insight: "Modest protective effect.",
                type: "protective",
            },
        ],
    },
    {
        id: 2,
        title: "StockPulse — Autonomous Multi-Agent Stock Intelligence Dashboard",
        description: "An AI-powered portfolio analysis platform that unifies live market data, technical indicators, and agentic reasoning into a single dashboard — replacing fragmented tools with one intelligent system.",
        category: "AI / Full Stack",
        image: StockPulseImg,
        tags: ["Python", "Flask", "SQLite", "Claude AI", "Anthropic API", "Multi-Agent", "Tool Use", "Chart.js", "JavaScript", "HTML/CSS", "Massive API", "BEA API"],
        year: "2025",
        role: "Full Stack AI Engineer",
        highlight: "Five specialised agents — coordinated by a master orchestrator — deliver live forecasts, composite insight scores, and natural-language Q&A over real market data.",
        demo: "#",
        repo: "#",
        problem: "Prices, news, technicals, and fundamentals all live in separate tools — there's no single view. Static charts show what happened but don't say what to do next. Analysts face information overload without actionable insight, spending more time aggregating data than making decisions.",
        approach: "Designed a multi-agent architecture where a Coordinator Agent dispatches work to specialised sub-agents: a Market Snapshot agent, Technical Indicators agent, Historical Bars agent, News agent, EDGAR filing agent, and a Macro agent pulling GDP and CPI data from the BEA API. An Intelligence Layer — Forecast Agent, Insight Agent, and an AI Analyst powered by Claude (claude-sonnet-4-6) — reasons over the aggregated data to produce forecasts and natural-language answers. Claude uses agentic tool-use loops, deciding which registered tools to call and in what order based on the user's question.",
        solution: "StockPulse is a unified stock intelligence platform with five core modules: Live Portfolio Tracking with real-time sparklines, Real-Time Market Data via Massive API, 5-Day Price Forecasts (Bull / Base / Bear) using EMA, SMA, MACD, RSI, and volatility inputs, a Composite Insight Score (0–100) weighted across market, news, technical, context, and event signals, and an AI Analyst Chat where users ask questions in plain English and Claude reasons over live data to respond.",
        impact: "Eliminated the need for five separate tools by consolidating market data, AI reasoning, and forecasting into one dashboard. Agentic tool-use loops proved far more flexible than hardcoded pipelines — Claude adapts its reasoning steps to each unique question, producing context-aware answers no predetermined sequence could match.",
        gallery: [SP_slide3, SP_slide4, SP_slide7, SP_slide10],
        galleryLabels: ["Five Core Modules", "Multi-Agent Architecture", "Claude AI Integration", "Dashboard Layout"],
        stats: [
            { value: "8",    label: "Specialised Agents" },
            { value: "5",    label: "Core Modules" },
            { value: "0–100", label: "Insight Score Range" },
            { value: "5-day", label: "Price Forecast" },
        ],
        features: [
            { title: "Live Portfolio Tracking",    desc: "Real-time price updates with sparklines and day change indicators for every tracked symbol." },
            { title: "5-Day Price Forecasts",      desc: "Bull / Base / Bear scenarios generated from EMA, SMA, MACD, RSI, and intraday volatility." },
            { title: "Composite Insight Score",    desc: "A 0–100 score weighted across market (30%), news (25%), technical (20%), context (15%), events (10%)." },
            { title: "AI Analyst Chat",            desc: "Claude reasons over live APP_STATE data in an agentic tool-use loop, answering questions in plain English." },
            { title: "Multi-Agent Orchestration",  desc: "A Coordinator Agent dispatches tasks to 7 specialised sub-agents — no agent tries to do everything." },
        ],
        keyVariables: [
            {
                title: "Composite Insight Score",
                sub: "0–100 Weighted Signal",
                description: "A single score synthesising five data dimensions: 30% market conditions, 25% news sentiment, 20% technical indicators, 15% contextual factors, and 10% event signals.",
                hazardRatio: "0–100",
                insight: "Unified signal across all agents.",
                type: "protective",
            },
            {
                title: "5-Day Price Forecast",
                sub: "Bull / Base / Bear Scenarios",
                description: "Algorithmic model using EMA-20, SMA-50, MACD histogram, RSI, and intraday volatility to produce three price targets and a confidence-labelled model type (Trend Continuation, Mean Reversion, Mixed Signals).",
                hazardRatio: "3 scenarios",
                insight: "Quantified uncertainty for decisions.",
                type: "protective",
            },
            {
                title: "Agentic Tool-Use Loop",
                sub: "Claude Decides Reasoning Steps",
                description: "Claude (claude-sonnet-4-6) selects which registered tools to call — get_portfolio_overview, get_stock_data, get_forecast, get_insight_score — and how many times, based entirely on the user's question context.",
                hazardRatio: "Dynamic",
                insight: "Flexible over hardcoded pipelines.",
                type: "protective",
            },
        ],
    },
];

export const educationData = [
    {
        university: "Loyola Marymount University",
        degree: "Master's in Computer Science",
        year: "2024 – 2026",
        location: "Los Angeles, CA",
        image: EducationImg1,
    },
    {
        university: "Gujarat Technological University",
        degree: "Bachelor's in Information Technology",
        year: "2020 – 2024",
        location: "Gujarat, India",
        image: EducationImg2,
    },
];

export const experienceData = [
    {
        role: "Data Analyst Intern",
        company: "Maroon (Date Maroon)",
        location: "USA · Remote",
        period: "April 2026 – Present",
        responsibilities: [
            "Built a structured metrics dictionary defining core funnel KPIs — onboarding, profile completion, browse, match, and conversation — with locked formulas and edge case documentation for consistent weekly measurement.",
            "Performed funnel drop-off analysis across 5 stages, uncovering a waitlist gate as the primary bottleneck blocking all downstream user activity and recommending data-driven fixes for each drop-off point.",
            "Delivered weekly structured reports translating qualitative app observations into actionable product insights, including instrumentation recommendations and prioritised data gap analysis for the engineering team.",
            "Conducted hands-on product testing to identify critical UX friction points and bugs — including a silent photo validation error affecting profile completion rate — with root cause analysis and proposed fixes.",
        ],
    },
    {
        role: "iOS Developer Intern",
        company: "ZenZiee Corp.",
        location: "USA",
        period: "December 2025 – March 2026",
        responsibilities: [
            "Built and shipped AI-powered social features using Swift and SwiftUI to make the app more personalised and engaging for users.",
            "Designed and integrated API communication flows to ensure smooth, reliable interaction between the app and backend systems.",
            "Improved UI responsiveness and animation transitions to deliver a more fluid, premium user experience.",
            "Participated in sprint planning, feature discussions, and cross-functional collaboration in a fast-paced startup environment.",
        ],
    },
    {
        role: "Graduate Teaching Assistant",
        company: "Loyola Marymount University",
        location: "Los Angeles, CA",
        period: "August 2024 – Present",
        responsibilities: [
            "Mentored graduate students in building deep learning models using Python and ML frameworks — translating complex technical concepts into practical, hands-on implementation.",
            "Guided students in relational database design, indexing, and query optimisation to strengthen understanding of efficient data systems.",
            "Reviewed and debugged student code to ensure correctness, improve efficiency, and reinforce strong engineering practices.",
        ],
    },
    {
        role: "Graduate VR Research Lab Assistant",
        company: "Loyola Marymount University",
        location: "Los Angeles, CA",
        period: "November 2024 – June 2025",
        responsibilities: [
            "Collaborated with faculty across multiple universities on a federally funded research project to design and refine an interactive VR-based chemistry learning environment.",
            "Conducted user research studies — observing participant interactions, collecting qualitative feedback, and analysing responses to evaluate usability, engagement, and learning effectiveness.",
            "Documented research findings and contributed to cross-institutional project reports and discussions.",
        ],
    },
];

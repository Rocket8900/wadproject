const ftt_questions = [
    {
        question: "When should you use the right outer most lane of a carriageway?",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "When overtaking.", correct: true },
            { text: "When all other lanes are occupied.", correct: false },
            { text: "When driving at the maximum speed.", correct: false },
        ]
    },
    {
        question: "How is the handbrake released?",
        category: "Vehicle Operation and Controls",
        image: "https://www.sgbtt.com/images/questions/300.jpg",
        answers: [
            { text: "By pulling up the lever.", correct: false },
            { text: "By lowering the lever.", correct: false },
            { text: "By slightly pulling the lever up before lowering it.", correct: true },
        ]
    },
    {
        question: "When the clutch pedal is depressed ______ will no longer be effective.",
        category: "Vehicle Operation and Controls",
        image: "",
        answers: [
            { text: "Hand Brake", correct: false },
            { text: "Foot Brake", correct: false },
            { text: "Engine Brake", correct: true },
        ]
    },
    {
        question: "All drivers are required to switch on their headlights while driving",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "from 7.00pm to 7.00am.", correct: true },
            { text: "from 7.30pm to 7:30am.", correct: false },
            { text: "from 6:30pm to 6:30am.", correct: false },
        ]
    },
    {
        question: "After changing from 2nd gear to 3rd gear, you should",
        category: "Vehicle Operation and Controls",
        image: "",
        answers: [
            { text: "release the clutch pedal immediately.", correct: false },
            { text: "not release the clutch pedal at all.", correct: false },
            { text: "release the clutch gradually.", correct: true },
        ]
    },
    {
        question: "Which of the following is not a proper attire for driving?",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "free-size clothes.", correct: false },
            { text: "shoes with soft soles.", correct: false },
            { text: "slippers.", correct: true },
        ]
    },
    {
        question: "When stopping for pedestrians to cross",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "Stop on top of the Stop-line", correct: false },
            { text: "Stop well before the Stop-line", correct: true },
            { text: "Stop after crossing the Stop-line", correct: false },
        ]
    },
    {
        question: "Most accidents can be prevented if the users:",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "only drive during the day", correct: false },
            { text: "have good knowledge of traffic rules and regulations", correct: false },
            { text: "are able to anticipate and react accordingly to the hazards", correct: true },
        ]
    },
    {
        question: "When driving across a sandy surface,",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "change to lower gear", correct: true },
            { text: "change to a higher gear", correct: false },
            { text: "depress the clutch pedal at all times", correct: false },
        ]
    },
    {
        question: "The Traffic Light Surveillance Camera is mounted on a special casing pole and another similar box installed about ______ away houses the flash light.",
        category: "Road Signs and Signals",
        image: "",
        answers: [
            { text: "10 Metres", correct: false },
            { text: "20 Metres", correct: true },
            { text: "30 Metres", correct: false },
        ]
    },
    {
        question: "There are ______ categories of offences that carry demerit points according to the severity.",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "6", correct: false },
            { text: "8", correct: true },
            { text: "9", correct: false },
        ]
    },
    {
        question: "Intermittent braking(ON/OFF)",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "should be used only in emergencies.", correct: false },
            { text: "confuses motorist following behind and increases the risk of accidents.", correct: false },
            { text: "gives adequate warning to motorists following behind.", correct: true },
        ]
    },
    {
        question: "When approaching a zebra crossing, you should",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "stop only when there are pedestrians on the crossing.", correct: false },
            { text: "slow down and do not overtake.", correct: true },
            { text: "accelerate to pass it.", correct: false },
        ]
    },
    {
        question: "If you cannot steer straight because the road surface is not even, you should",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "reduce speed.", correct: true },
            { text: "loosen your grip on the steering wheel.", correct: false },
            { text: "increase speed.", correct: false },
        ]
    },
    {
        question: "You will not be allowed to take your driving test if you have",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "13 demerit points.", correct: true },
            { text: "24 demerit points.", correct: false },
            { text: "12 demerit points.", correct: false },
        ]
    },
    {
        question: "As you approach a bend, an automatic car will sometimes 'change up' because there is less pressure on the accelerator. To prevent this happening, you should",
        category: "Vehicle Operation and Controls",
        image: "",
        answers: [
            { text: "brake as you go round the bend.", correct: false },
            { text: "slow down before the bend and accelerate gently as you turn.", correct: true },
            { text: "brake and accelerate at the same time.", correct: false },
        ]
    },
    {
        question: "You should not depress the clutch when",
        category: "Vehicle Operation and Controls",
        image: "",
        answers: [
            { text: "going round a bend.", correct: true },
            { text: "stopping.", correct: false },
            { text: "changing gears.", correct: false },
        ]
    },
    {
        question: "Continuously using the 'Half-clutch' technique for long period of time will cause",
        category: "Vehicle Operation and Controls",
        image: "",
        answers: [
            { text: "the engine brake to wear out faster.", correct: false },
            { text: "the clutch linings to wear out faster.", correct: true },
            { text: "the brake linings to wear out faster.", correct: false },
        ]
    },
    {
        question: "When you want to make a left turn, you should slow down and change to 3rd or 2nd gear",
        category: "Vehicle Operation and Controls",
        image: "",
        answers: [
            { text: "while you are turning.", correct: false },
            { text: "after turning.", correct: true },
            { text: "before you begin the turn.", correct: false },
        ]
    },
    {
        question: "When you turn your steering to the right, which way do your wheels turn?",
        category: "Vehicle Operation and Controls",
        image: "",
        answers: [
            { text: "To the right.", correct: true },
            { text: "To the left then to the right.", correct: false },
            { text: "To the left.", correct: false },
        ]
    },

];

export { ftt_questions };
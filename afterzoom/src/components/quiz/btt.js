const btt_questions = [
    {
        question: "This sign means you",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690474/btt_test_1/Screenshot_2023-07-18_at_10.21.29_PM_xu2fso.png",
        answers: [
            { text: "Can turn left immediately upon reaching the junction.", correct: false },
            { text: "Must stop and give way before turning left.", correct: true },
            { text: "Need not stop and check as you have the right of way.", correct: false },
        ]
    },
    {
        question: "This sign means",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690473/btt_test_1/Screenshot_2023-07-18_at_10.21.36_PM_qosdg3.png",
        answers: [
            { text: "One way traffic ahead - vehicles may turn right or left.", correct: false },
            { text: "Drive straight ahead only - vehicles are not allowed to turn right or left.", correct: true },
            { text: "Steep slope ahead - drive carefully and do not overtake.", correct: false },
        ]
    },
    {
        question: "This sign means 'No Entry' for vehicles",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690473/btt_test_1/Screenshot_2023-07-18_at_10.21.43_PM_fteh25.png",
        answers: [
            { text: "With overall height exceeding 4.5 metres.", correct: true },
            { text: "With overall width exceeding 4.5 metres.", correct: false },
            { text: "With overall length exceeding 4.5 metres.", correct: false },
        ]
    },
    {
        question: "This sign means",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690473/btt_test_1/Screenshot_2023-07-18_at_10.21.49_PM_tigpni.png",
        answers: [
            { text: "You cannot park abreast another car.", correct: false },
            { text: "'No Entry' for motor cars.", correct: false },
            { text: "You cannot overtake another vehicle.", correct: true },
        ]
    },
    {
        question: "When you see this sign, you should",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690473/btt_test_1/Screenshot_2023-07-18_at_10.21.55_PM_pw2ts6.png",
        answers: [
            { text: "Slow down and prepare to stop - road ends ahead.", correct: false },
            { text: "Slow down and drive carefully - dual-carriageway ahead.", correct: false },
            { text: "Slow down, do not overtake - road narrows ahead.", correct: true },
        ]
    },
    {
        question: "When you see this sign, you should",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690473/btt_test_1/Screenshot_2023-07-18_at_10.22.00_PM_vtaam3.png",
        answers: [
            { text: "Slow down and give way to traffic on the right.", correct: true },
            { text: "Slow down and give way to traffic on the left.", correct: false },
            { text: "Not slow down at all.", correct: false },
        ]
    },
    {
        question: "This sign means",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690473/btt_test_1/Screenshot_2023-07-18_at_10.22.06_PM_laklzs.png",
        answers: [
            { text: "Two lanes are merging - alternative vehicles have the right of way.", correct: false },
            { text: "You must make a U-turn as the road is ending ahead.", correct: false },
            { text: "You should slow down, keep left and beware of oncoming traffic.", correct: true },
        ]
    },
    {
        question: "This sign means",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690473/btt_test_1/Screenshot_2023-07-18_at_10.22.12_PM_awunog.png",
        answers: [
            { text: "Electronic Road Patrol ahead.", correct: false },
            { text: "Electronic Road Pricing zone ahead.", correct: true },
            { text: "Electronic Report Panel ahead.", correct: false },
        ]
    },
    {
        question: "This sign indicates",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690473/btt_test_1/Screenshot_2023-07-18_at_10.22.19_PM_lgeipn.png",
        answers: [
            { text: "That there is a broken down vehicle ahead - slow down and drive carefully.", correct: true },
            { text: "That you should change lane and drive faster so as not to obstruct other traffic.", correct: false },
            { text: "You may drive on at any speed because the road ahead is clear.", correct: false },
        ]
    },
    {
        question: "This designated shelter is for",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690472/btt_test_1/Screenshot_2023-07-18_at_10.22.25_PM_bvqect.png",
        answers: [
            { text: "Motor-car drivers.", correct: false },
            { text: "Motor-cyclists", correct: true },
            { text: "Pedestrians.", correct: false },
        ]
    },
    {
        question: "This sign is applicable",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690472/btt_test_1/Screenshot_2023-07-18_at_10.23.30_PM_crxs12.png",
        answers: [
            { text: "Only during peak hours.", correct: false },
            { text: "Only at night.", correct: false },
            { text: "At all times.", correct: true },
        ]
    },
    {
        question: "When you see this sign whilst driving, you",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690472/btt_test_1/Screenshot_2023-07-18_at_10.23.36_PM_vdvcqo.png",
        answers: [
            { text: "Are in a single lane traffic, keep left if you are not overtaking.", correct: false },
            { text: "May turn right or left if there are side roads.", correct: true },
            { text: "Cannot turn right or left but must proceed straight ahead.", correct: false },
        ]
    }, {
        question: "This light signal at the entrance of the tunnel means",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690472/btt_test_1/Screenshot_2023-07-18_at_10.23.40_PM_gjv87d.png",
        answers: [
            { text: "The lane is reserved for emergency vehicles only.", correct: false },
            { text: "There is obstruction ahead, proceed slowly.", correct: false },
            { text: "The lane is closed to traffic.", correct: true },
        ]
    }, {
        question: "When you see this sign, you should",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690472/btt_test_1/Screenshot_2023-07-18_at_10.23.46_PM_zphrcv.png",
        answers: [
            { text: "Slow down and drive carefully, beware of children crossing the road.", correct: true },
            { text: "Drive at the normal speed as the jogging track is on the opposite side of the road.", correct: false },
            { text: "Keep a lookout for a children playground ahead.", correct: false },
        ]
    },
    {
        question: "When you see this sign, you should",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690472/btt_test_1/Screenshot_2023-07-18_at_10.23.51_PM_w7twje.png",
        answers: [
            { text: "Keep a lookout as there is a school for the blind ahead.", correct: false },
            { text: "Slow down and beware of elderly people crossing the road.", correct: true },
            { text: "Stop the car and help the handicapped person to cross the road.", correct: false },
        ]
    },
    {
        question: "The markings (black arrows) indicated in the diagram mean",
        category: "Rules and Regulations",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690472/btt_test_1/Screenshot_2023-07-18_at_10.23.59_PM_of9uzl.png",
        answers: [
            { text: "Turning vehicles should remain within the pocket whilst waiting for oncoming traffic to clear.", correct: true },
            { text: "It is an offence to drive and wait there in any situation.", correct: false },
            { text: "You should only drive into the pocket when it is clear for you to turn right.", correct: false }
        ]
    },
    {
        question: "When you see a triangular marking on the road, you should",
        category: "Rules and Regulations",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690472/btt_test_1/Screenshot_2023-07-18_at_10.24.11_PM_ienld6.png",
        answers: [
            { text: "Keep left and beware of oncoming traffic.", correct: false },
            { text: "Drive past the marking on either side without crossing it.", correct: false },
            { text: "Slow down and give way to traffic on the major road ahead.", correct: true }
        ]
    },
    {
        question: "When you see the amber traffic light flashing at a junction, you should",
        category: "Rules and Regulations",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690471/btt_test_1/Screenshot_2023-07-18_at_10.24.17_PM_fymxet.png",
        answers: [
            { text: "Go through the junction quickly.", correct: false },
            { text: "Maintain your speed.", correct: false },
            { text: "Slow down and proceed carefully.", correct: true }
        ]
    },
    {
        question: "When the green arrow traffic light starts blinking, you should",
        category: "Rules and Regulations",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690471/btt_test_1/Screenshot_2023-07-18_at_10.24.24_PM_ldjkso.png",
        answers: [
            { text: "Not proceed if you have not crossed the stop-line.", correct: true },
            { text: "Speed up to make the turn before the light stops blinking.", correct: false },
            { text: "Drive on and stop only when the light goes off.", correct: false }
        ]
    },
    {
        question: "When the traffic light turns green at a junction, you should",
        category: "Rules and Regulations",
        answers: [
            { text: "Depress the accelerator hard and move off quickly.", correct: false },
            { text: "Check traffic from right and left before moving off.", correct: true },
            { text: "Only move off when other vehicles move.", correct: false }
        ]
    },
    {
        question: "A flashing amber traffic light signal means",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "Signal is about to be cancelled.", correct: false },
            { text: "Stop unless you are so close to the stop-line that you cannot stop safely.", correct: false },
            { text: "Traffic lights signals are out of order.", correct: true }
        ]
    },
    {
        question: "The Police officer is signalling",
        category: "Rules and Regulations",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690471/btt_test_1/Screenshot_2023-07-18_at_10.24.33_PM_zkew7y.png",
        answers: [
            { text: "Drivers from his right to go and those from his left to slow down and stop", correct: true },
            { text: "Drivers from his front and rear to go.", correct: false },
            { text: "Drivers from his left to go and those from his right to stop.", correct: false }
        ]
    },
    {
        question: "The driver is indicating that",
        category: "Rules and Regulations",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690471/btt_test_1/Screenshot_2023-07-18_at_10.24.39_PM_gc4fvu.png",
        answers: [
            { text: "He wants to pull over to the right.", correct: false },
            { text: "He wants to slow down.", correct: true },
            { text: "He wants to stay alongside the next vehicle.", correct: false }
        ]
    },
    {
        question: "The driver is indicating that",
        category: "Rules and Regulations",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690471/btt_test_1/Screenshot_2023-07-18_at_10.24.45_PM_fwqeww.png",
        answers: [
            { text: "He wants to drive up to the multi-storey car park.", correct: false },
            { text: "He wants you to overtake him.", correct: false },
            { text: "He wants to stop the car.", correct: true }
        ]
    },
    {
        question: "Before overtaking another vehicle, you should signal for at least",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Three seconds", correct: true },
            { text: "Five seconds", correct: false },
            { text: "Seven seconds", correct: false }
        ]
    },
    {
        question: "If a motorcyclist is trying to overtake you, you should",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Drive faster to prevent the rider from overtaking you.", correct: false },
            { text: "Slow down and assist the rider to overtake safely.", correct: true },
            { text: "Signal the driver to overtake on the left.", correct: false }
        ]
    },
    {
        question: "Which car has the right of way?",
        category: "Rules and Regulations",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690470/btt_test_1/Screenshot_2023-07-18_at_10.24.57_PM_nsc5hl.png",
        answers: [
            { text: "Car A.", correct: true },
            { text: "Car B.", correct: false },
            { text: "Whoever gets to the intersection first.", correct: false }
        ]
    },
    {
        question: "Crossing the double continuous white lines along the centre of the road",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "Is an offence because it is unsafe to do so.", correct: true },
            { text: "Is not an offence if you are overtaking another vehicle.", correct: false },
            { text: "Is not an offence if you do not cause inconvenience to others.", correct: false }
        ]
    },
    {
        question: "No parking is allowed within",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "12 metres of a junction.", correct: false },
            { text: "6 metres of a junction.", correct: true },
            { text: "9 metres of a junction.", correct: false }
        ]
    },
    {
        question: "Parking of vehicle is prohibited within",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "15 metres of a bus stop.", correct: false },
            { text: "12 metres of a bus stop.", correct: false },
            { text: "9 metres of a bus stop.", correct: true }
        ]
    },
    {
        question: "When approaching a sharp bend or a steep hill, you",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Should not overtake other vehicles.", correct: true },
            { text: "May overtake other vehicles.", correct: false },
            { text: "Should stay close behind the front vehicle.", correct: false }
        ]
    },
    {
        question: "When the vehicle you are overtaking suddenly increases its speed, you should",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Increase your speed further.", correct: false },
            { text: "Sound the horn and signal the driver to slow down.", correct: false },
            { text: "Reduce your speed and return to your original lane.", correct: true }
        ]
    },
    {
        question: "When driving through puddles of water on the road, you should",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Drive faster.", correct: false },
            { text: "Drive slower.", correct: true },
            { text: "Not change speed.", correct: false }
        ]
    },
    {
        question: "A driver caught with a blood alcohol concentration over 80 mg of alcohol per 100 ml of blood will",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Have to pay a fine.", correct: false },
            { text: "Be charged in court.", correct: true },
            { text: "Be jailed.", correct: false }
        ]
    },
    {
        question: "After consuming alcohol, you should",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Not drive.", correct: true },
            { text: "Drive slowly.", correct: false },
            { text: "Drive at normal speed.", correct: false }
        ]
    },
    {
        question: "Any person caught driving with blood alcohol content which exceeds the prescribed limit will",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Have to pay a fine.", correct: false },
            { text: "Be charged in court.", correct: true },
            { text: "Be given a warning.", correct: false }
        ]
    },
    {
        question: "Drink driving may cause",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Reduce the co-ordination of the control of the vehicle.", correct: true },
            { text: "Faster reaction.", correct: false },
            { text: "Increase alertness.", correct: false }
        ]
    },
    {
        question: "In the situation shown, the long vehicle is about to turn left and the car is going straight. The car should",
        category: "Safety and Defensive Driving",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690470/btt_test_1/Screenshot_2023-07-18_at_10.25.09_PM_vgxsiq.png",
        answers: [
            { text: "Slow down and stop if necessary.", correct: true },
            { text: "Maintain its speed and position.", correct: false },
            { text: "Proceed quickly to pass the junction.", correct: false }
        ]
    },
    {
        question: "Car A intends to pass Car B near a side road on the left, Car A should",
        category: "Safety and Defensive Driving",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689690471/btt_test_1/Screenshot_2023-07-18_at_10.25.18_PM_ycf2tz.png",
        answers: [
            { text: "Drive faster to pass the junction.", correct: false },
            { text: "Pass Car B on the right side.", correct: false },
            { text: "Pass Car B only after the junction.", correct: true }
        ]
    },
    {
        question: "Before changing lanes, you should check your blind spots by",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Looking into the rearview mirror.", correct: false },
            { text: "Looking over your shoulder.", correct: true },
            { text: "Looking at the side mirrors.", correct: false }
        ]
    },
    {
        question: "You are on a clear and open road in good weather conditions, the distance between you and the vehicle in front should be",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "One car's length.", correct: false },
            { text: "Two car's lengths.", correct: false },
            { text: "Two-second time gap.", correct: true }
        ]
    },
    {
        question: "You should give way to emergency vehicles approaching from behind by",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "Slowing down.", correct: false },
            { text: "Moving to the side.", correct: true },
            { text: "Driving faster.", correct: false }
        ]
    },
    {
        question: "When an emergency vehicle behind you sounds its siren, you should",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "Slow down quickly.", correct: false },
            { text: "Pull to the side and stop if necessary.", correct: true },
            { text: "Increase your speed.", correct: false }
        ]
    },
    {
        question: "After your vehicle passed through a flood, you should",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Stop on a slope to drain water out of the brakes.", correct: false },
            { text: "Drive faster to allow the brakes to dry quickly.", correct: false },
            { text: "Apply intermittent braking to dry the brake drums at low speed.", correct: true }
        ]
    },
    {
        question: "Switching lanes suddenly or abruptly will",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Improve the flow of traffic on the road.", correct: false },
            { text: "Cause inconvenience and danger to other motorists.", correct: true },
            { text: "Cause wear and tear to the vehicle.", correct: false }
        ]
    },
    {
        question: "If the headlight of an oncoming vehicle is blinding you, you should",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
            { text: "Turn on the high beam.", correct: false },
            { text: "Look to the right kerb.", correct: false },
            { text: "Look to the left kerb.", correct: true }
        ]
    },
    {
        question: "At night you should switch on your headlights from",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "6 pm to 7 am.", correct: false },
            { text: "7 pm to 6 am.", correct: false },
            { text: "7 pm to 7 am.", correct: true }
        ]
    },
    {
        question: "When can you use the right lane of a two-lane carriageway?",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "When your path of travel is obstructed by road works or parked vehicles.", correct: true },
            { text: "When your speed is higher than the speed limit for the road.", correct: false },
            { text: "When the right lane is free of traffic.", correct: false }
        ]
    },
    {
        question: "On Saturday, all vehicles must avoid the bus lane between",
        category: "Rules and Regulations",
        image: "",
        answers: [
            { text: "11.00 am and 2.00 pm.", correct: false },
            { text: "11.30 am and 2.00 pm.", correct: true },
            { text: "11.30 am and 2.30 pm.", correct: false }
        ]
    },
    {
        question: "On seeing this sign, you",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689748509/btt_test_3/Screenshot_2023-07-19_at_2.32.23_PM_b64sat.png",
        answers: [
          { text: "Must turn right ahead.", correct: true },
          { text: "May turn left or go straight if you wish.", correct: false },
          { text: "Must make a U-turn as the road ends on the right.", correct: false }
        ]
      },
      {
        question: "This sign means",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689748509/btt_test_3/Screenshot_2023-07-19_at_2.32.41_PM_jaeggk.png",
        answers: [
          { text: "There is a sharp bend on the left - drive carefully.", correct: false },
          { text: "You cannot go straight or turn right.", correct: false },
          { text: "Keep to the left side of the road.", correct: true }
        ]
      },
      {
        question: "This sign means",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689748508/btt_test_3/Screenshot_2023-07-19_at_2.32.47_PM_nvkt84.png",
        answers: [
          { text: "'No Waiting' for lorries.", correct: false },
          { text: "'No Parking' for lorries.", correct: false },
          { text: "'No Entry' for lorries.", correct: true }
        ]
      },
      {
        question: "This sign means",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689748509/btt_test_3/Screenshot_2023-07-19_at_2.32.51_PM_lnnfa6.png",
        answers: [
          { text: "You can wait for a short while if you are loading or unloading.", correct: false },
          { text: "You cannot wait but you can stop to let down or pick up passengers.", correct: true },
          { text: "You cannot stop even to let down or pick up passengers.", correct: false }
        ]
      },
      {
        question: "This sign means",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689748508/btt_test_3/Screenshot_2023-07-19_at_2.32.57_PM_fnakkj.png",
        answers: [
          { text: "You are about to pass an MRT line.", correct: false },
          { text: "You are about to pass an overhead bridge.", correct: false },
          { text: "You are about to enter the expressway.", correct: true }
        ]
      },
      {
        question: "When you see this sign, you should",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689748508/btt_test_3/Screenshot_2023-07-19_at_2.33.03_PM_hc0laf.png",
        answers: [
          { text: "Switch lane and drive faster to avoid obstruction.", correct: false },
          { text: "Slow down and beware of laborers in front.", correct: true },
          { text: "Slow down and beware of open-air hawker stalls.", correct: false }
        ]
      },
      {
        question: "When you see this sign, you should",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689748508/btt_test_3/Screenshot_2023-07-19_at_2.33.18_PM_qdaznu.png",
        answers: [
          { text: "Overtake slow-moving vehicles so that you will not lose speed.", correct: false },
          { text: "Overtake slow-moving vehicles and build up speed to go up the slope.", correct: false },
          { text: "Keep left, do not overtake, beware of oncoming traffic.", correct: true }
        ]
      },
      {
        question: "This sign means that",
        category: "Road Signs and Signals",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689748508/btt_test_3/Screenshot_2023-07-19_at_2.33.23_PM_ptgmcw.png",
        answers: [
          { text: "No vehicle is allowed to remain in the yellow box under any circumstances.", correct: false },
          { text: "Veniche vehicles are allowed to remain in the yellow box if they do not obstruct other vehicles going straight.", correct: true },
          { text: "Other vehicles are allowed to remain in the yellow box if they do not obstruct other vehicles.", correct: false }
        ]
      },
      {
        question: "A broken white line on the centre of the road as shown in this diagram means",
        category: "Rules and Regulations",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689748509/btt_test_3/Screenshot_2023-07-19_at_2.33.51_PM_xwmxxt.png",
        answers: [
          { text: "The area is dangerous, you must not overtake.", correct: false },
          { text: "Keep to the left of this line.", correct: true },
          { text: "Parking is not allowed on either side of the road.", correct: false }
        ]
      },
      {
        question: "The single continuous white line along the centre of a two-way road means",
        category: "Rules and Regulations",
        image: "https://res.cloudinary.com/dzh7rqxop/image/upload/v1689748509/btt_test_3/Screenshot_2023-07-19_at_2.33.58_PM_g0csy9.png",
        answers: [
          { text: "No Parking on both sides of the road during weekdays.", correct: false },
          { text: "No Parking on both sides of the road between 7.00 am and 7.00 pm.", correct: false },
          { text: "No Parking on both sides of the road at all times.", correct: true }
        ]
      },
      {
        question: "The light turns red as you approach a traffic junction, when stopping you should",
        category: "Rules and Regulations",
        image: "",
        answers: [
          { text: "Depress the brake and the clutch pedals simultaneously.", correct: false },
          { text: "Shift to neutral and step on the brakes.", correct: false },
          { text: "Brake firmly and depress the clutch pedal as the car comes to a stop.", correct: true }
        ]
      },
      {
        question: "If the car you are overtaking is drifting in its lane, you should",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
          { text: "Use your horn to warn him.", correct: true },
          { text: "Signal him with your hand.", correct: false },
          { text: "Overtake it quickly.", correct: false }
        ]
      },
      {
        question: "To drive in a way where other drivers will not find it necessary to overtake you, you should",
        category: "Safety and Defensive Driving",
        image: "",
        answers: [
          { text: "Drive on the extreme right lane all the time.", correct: false },
          { text: "Always drive at a speed that matches the traffic flow.", correct: true },
          { text: "Drive at the maximum speed limit of the road all the time.", correct: false }
        ]
      },

];
// console.log('btt.js:' + btt_questions)
export { btt_questions };
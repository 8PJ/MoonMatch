// calculation functions

// lunar functions

const phaseNums = {
    "New Moon": 0,
    "Waxing Crescent Moon": 1,
    "First Quarter Moon": 2,
    "Waxing Gibbous Moon": 3,
    "Full Moon": 4,
    "Waning Gibbous Moon": 5,
    "Last Quarter Moon": 6,
    "Waning Crescent Moon": 7
};

const LUNAR_MONTH = 29.530588853;

const getJulianDate = (date) => {
    const time = date.getTime();
    const tzoffset = date.getTimezoneOffset();

    return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
};

const getLunarAge = (date) => {
    const percent = getLunarAgePercent(date);
    const age = percent * LUNAR_MONTH;
    return age;
};

const getLunarAgePercent = (date) => {
    return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
};

const normalize = (value) => {
    value = value - Math.floor(value);

    if (value < 0) {
        value = value + 1;
    }
    return value;
};

const getLunarPhase = (date) => {
    const age = getLunarAge(date);
    if (age < 1.84566)
        return "New Moon";
    else if (age < 5.53699)
        return "Waxing Crescent Moon";
    else if (age < 9.22831)
        return "First Quarter Moon";
    else if (age < 12.91963)
        return "Waxing Gibbous Moon";
    else if (age < 16.61096)
        return "Full Moon";
    else if (age < 20.30228)
        return "Waning Gibbous Moon";
    else if (age < 23.99361)
        return "Last Quarter Moon";
    else if (age < 27.68493)
        return "Waning Crescent Moon";
    return "New Moon";
};

const getMoonDescription = (phase) => {
    switch (phase) {
        case "New Moon":
            return newMoon;
        case "Waxing Crescent Moon":
            return waningCrescent;
        case "First Quarter Moon":
            return newMoon;
        case "Waxing Gibbous Moon":
            return waningCrescent;
        case "Full Moon":
            return newMoon;
        case "Waning Gibbous Moon":
            return waningCrescent;
        case "Last Quarter Moon":
            return newMoon;
        case "Waning Crescent Moon":
            return waningCrescent;
        default:
            return newMoon;
    }
};

const compatibility = (date1, date2) => {
    // get lunar phases
    let lunarPhase1 = getLunarPhase(date1);
    let lunarPhase2 = getLunarPhase(date2);

    // get phase numbers
    let pahseNum1 = phaseNums[lunarPhase1];
    let pahseNum2 = phaseNums[lunarPhase2];

    return 100 - (6 * Math.abs(pahseNum1 - pahseNum2)) - (25 * randTwoDate(date1, date2));
};

// other functions

const dateToInt = (date) => {
    return normalize(Math.sin(3 * Math.cos(date.getFullYear())) +
        Math.cos(6 * Math.sin(date.getMonth() / 5 + 1)) +
        Math.cos(date.getDate() / 15));
};

const randTwoDate = (date1, date2) => {
    return (dateToInt(date1) + dateToInt(date2)) / 2;
};

// DOM functions

$("#submitData").click(() => {
    // remove warning message
    $("#noDataWarn").remove();

    // remove results
    $(".results").hide();

    // get input dates
    let bday1 = $("#bdate1").val();
    let bday2 = $("#bdate2").val();

    // print an error message if date input is missing
    if (bday1 == "" || bday2 == "") {
        $("#submitButton").prepend("<p id=\"noDataWarn\" class=\"text-danger\">Please enter both dates</p>");
        return;
    }

    // get date objects
    let date1 = new Date(bday1);
    let date2 = new Date(bday2);

    // get lunar phases
    let lunarPhase1 = getLunarPhase(date1);
    let lunarPhase2 = getLunarPhase(date2);

    let compPercentage = compatibility(date1, date2);
    let real = Math.round(compPercentage * 100) / 100;

    $(".percentage").html("Your Moon Phase compatibility is: " + real + "%");

    $(".phase1").html(lunarPhase1);
    $(".phase2").html(lunarPhase2);

    $(".description1").html(getMoonDescription(lunarPhase1));
    $(".description2").html(getMoonDescription(lunarPhase2));

    $(".results").show();
});

// moon phase descriptions

const newMoon = `Being born on a New Moon is a magical and profound experience. During this
                phase, the night sky is dark and the moon is hidden. Although the moon is
                invisible and weak at this time, its influences are still meaningful. People
                born during the New Moon phase are adventurous, enthusiastic, and creative.
                They enjoy trying new things and facing new challenges in life. Sometimes,
                people born under a New Moon have a hard time trusting others.`;

const waxingCresent = `A Waxing Moon is the transitional phase between the New Moon and First Quarter
                    phase. Since the moon is growing during this period, being born on this phase
                    usually leads to growth in life too. 
                    A Waxing Crescent is a small sliver of a moon, occurring directly after the New
                    Moon. People born during a Waxing Crescent experience most of the same effects
                    as someone born under a New Moon. These people are generally adventurous,
                    ambitious, and productive. However, unlike people born under a New Moon,
                    someone with a Waxing Crescent phase may be more averse to risk.`;

const firstQuater = `Being born during the First Quarter moon phase makes you a well-rounded person
                    filled with potential. The First Quarter is when exactly half of the moon is
                    illuminated, meaning you are equally under the influence of dark and light.
                    This phase is symbolic of both growth and restraint. People born during this
                    moon phase are capable, strong individuals, but they may need extra motivation
                    to reach their goals.`;

const waxingGibbous = `A Waxing Gibbous is the end of the Waxing Moon phase, right before the Full
                    Moon phase. Since the moon is almost completely full at this time, the effects
                    are very strong. People born under a Waxing Gibbous are great at forming
                    relationships, since they're so compassionate and motivated. Having a Waxing
                    Gibbous birthday may make you positive and enthusiastic, but it may also cause
                    you to be fickle and indecisive.`;

const fullMoon = `People born under a Full Moon are incredible, powerful, unique individuals. The
                Full Moon phase is when the moon is at its brightest and most empowering. The
                intense pull of a Full Moon can create brutal waves and drive people to lunacy.
                There's a reason that the Full Moon plays such a large role in myths and
                legends, like werewolves.
                If you were born under a Full Moon, you likely have a free spirit with a wild
                heart. Being born during this moon phase can cause people to be impulsive,
                passionate, and energetic. This can lead to incredible success, or a life of
                chaos.`;

const waningGibbous = `A Waning Gibbous Moon is the transformative phase which leads the Full Moon
                    into the Last Quarter. The moon is beginning to disappear into the sky,
                    symbolizing self-reflection and rebirth. A Waning Gibbous is the first step of
                    the Full Moon beginning to wane. 
                    At this phase, the moon is still bright and mostly full. Since the effects of
                    the moon are so strong during this phase, people born beneath it are filled
                    with potential. Individuals born on a Waning Gibbous are highly self-aware,
                    giving them a unique potential for growth. They make great communicators, but
                    sometimes need to remind themselves when it's time to listen.`;

const lastQuater = `Being born during the Last Quarter moon phase can influence your life in many
                    ways. This phase, in between the Waning Gibbous and Waning Crescent, occurs
                    when the moon is still 50% illuminated. The Last Quarter symbolizes letting go
                    of the past and looking toward the future. For people born under the Last
                    Quarter, it can be difficult or frightening to leave the past behind.
                    Nonetheless, they're loyal, sentimental, and caring individuals.`;

const waningCrescent = `A Waning Crescent is the very last phase of the moon before the New Moon. The
                        moon may be small at this stage, but its effects are still extremely powerful.
                        A Waning Crescent is a wise, aged moon that has already experienced every phase
                        in the cycle. This causes people born under a Waning Crescent to possess
                        special talents or knowledge. Having this unique perspective can lead to a life
                        of success, imagination, and fulfillment. However, this can also make it
                        difficult to connect with people or form relationships.`;
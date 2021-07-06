var myTemplate;
var thisthing;
am4core.ready(function () {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart = am4core.create(
    "chartdiv",
    am4plugins_forceDirected.ForceDirectedTree
  );

  var networkSeries = chart.series.push(
    new am4plugins_forceDirected.ForceDirectedSeries()
  );

  thisthing = networkSeries;

  var level1Value = 600;
  var level2Value = 500;

  chart.data = [
    {
      name: "Beard Maintenance",
      value: level1Value,
      category: "Beards",
      color: "#2b8bf8",
      children: [
        {
          name: "How do I maintain my beard?",
          value: level2Value,
          children: [
            {
              name: "Does brushing beard stimulate growth",
              value: level2Value,
            },
            { name: "Can you over brush your beard?", value: level2Value },
            {
              name: "Should you comb your wet or dry?",
              value: level2Value,
            },
          ],
        },
        {
          name: "How can I thicken my beard?",
          value: level2Value,
          collapsed: true,
          children: [
            {
              name: "Does trimming your beard help it grow?",
              value: level2Value,
            },
            {
              name: "Does drinking water help grow beard?",
              value: level2Value,
            },
            {
              name: "Does vaseline help with beard growth?",
              value: level2Value,
            },
          ],
        },
        {
          name: "How do I shape my beard?",
          value: level2Value,
          children: [
            {
              name: "How can I shape my beard at home?",
              value: level2Value,
            },
            {
              name: "How do I shape my jawline beard?",
              value: level2Value,
            },
            { name: "What your beard says about you?", value: level2Value },
          ],
        },
        {
          name: "What are the stages of growing a beard?",
          value: level2Value,
          children: [
            { name: "Where should a beard end?", value: level2Value },
            {
              name: "How long does the awkward beard stage last?",
              value: level2Value,
            },
            {
              name: "Should your mustache be shorter than your beard?",
              value: level2Value,
            },
          ],
        },
        {
          name: "Can I wash my beard with just water?",
          value: level2Value,
          children: [
            {
              name: "How often should beard be washed?",
              value: level2Value,
            },
            { name: "Does Face Wash damage beard?", value: level2Value },
            {
              name: "Is salt water good for your beard?",
              value: level2Value,
            },
          ],
        },
      ],
    },
    {
      name: "Male Grooming",
      value: level1Value,
      color: "#D6006D",
      category: "Grooming",
      children: [
        {
          name: "What is it called when a man is well groomed?",
          children: [
            {
              name: "How do you describe a well groomed person?",
              value: level2Value,
            },
            {
              name: "How do you always be well groomed?",
              value: level2Value,
            },
            { name: "What is another word for neat?", value: level2Value },
          ],
        },
        {
          name: "How common is manscaping?",
          children: [
            { name: "Should males shave their armpits?", value: 135 },
            { name: "How often should guys shave their pubes?", value: 98 },
            { name: "What age should you start manscaping?", value: 98 },
          ],
        },
        {
          name: "What does it mean if a guy shaves his legs?",
          children: [
            { name: "Is it wrong for a man to shave his legs?" },
            {
              name: "Is it acceptable for men to shave their legs?",
              value: 148,
            },
            { name: "How do guys get rid of leg hair", value: 26 },
          ],
        },
        {
          name: "Should I shave pubic hair for wedding night?",
          children: [
            { name: "Do models shave down there?", value: 415 },
            {
              name: "How do you get rid of pubic hair without shaving or waxing?",
              value: 148,
            },
            { name: "How short should a man trim his pubes?", value: 89 },
            { name: "How do you groom your balls?", value: 89 },
          ],
        },
        {
          name: "Fifth",
          children: [
            {
              name: "E1",
              children: [
                { name: "EE1", value: 33 },
                { name: "EE2", value: 40 },
                { name: "EE3", value: 89 },
              ],
            },
            {
              name: "E2",
              value: 148,
            },
          ],
        },
      ],
    },
    {
      name: "Goatee Beard Styles",
      category: "Beards",
      value: level1Value,
      color: "#2b8bf8",
      children: [
        {
          name: "Is a goatee attractive?",
          children: [
            { name: "Does a goatee make you look older?" },
            { name: "Do beards make you look fatter?" },
            { name: "Do girls like goatees?" },
          ],
        },
        {
          name: "Is a goatee unprofessional?",
          children: [
            { name: "Do goatees look evil?" },
            { name: "Are goatees still in?" },
            { name: "Is a goatee considered a beard?" },
          ],
        },
        {
          name: "What do beards say about a man?",
          children: [
            { name: "Are beards alpha?" },
            { name: "Do guys with beards get more respect?" },
            { name: "Are beards spiritual" },
          ],
        },
        {
          name: "Which beard is most attractive?",
          children: [
            { name: "Are circle beards attractive?" },
            { name: "Are grey beards attractive?" },
            { name: "Do guys look better with beards?" },
          ],
        },
      ],
    },
    {
      name: "Male Waxing",
      category: "Hair Removal",
      //color: "linear-gradient(180deg, #FFC718 0%, #E58100 100%)",
      color: "#E58100",
      value: level1Value,
      children: [
        {
          name: "Should a man get waxed",
          children: [
            { name: "Does waxing hurt for guys?", value: 100 },
            { name: "What is the most painful thing to wax", value: 100 },
            {
              name: "Is it weird for a guy to get a Brazilian wax?",
              value: 100,
            },
          ],
        },
        {
          name: "Can guys wax their private area",
          children: [
            {
              name: "Is it better to shave or wax your balls?",
              value: 100,
            },
            {
              name: "Does shaving your balls make look bigger",
              value: 100,
            },
            { name: "Do guys get hard when getting waxed?", value: 100 },
          ],
        },
        {
          name: "Can you wax yourself at home?",
          children: [
            { name: "Is it cheaper to wax yourself?", value: 100 },
            { name: "Can I wax my own back?", value: 100 },
          ],
        },
        {
          name: "How long does male chest waxing last?",
          children: [
            { name: "What does chest hair say about a man?", value: 100 },
            { name: "Does waxing men's chest hurt?", value: 100 },
            { name: "Do men get their chest waxed?", value: 100 },
          ],
        },
        {
          name: "What is Hollywood or Brazilian wax?",
          children: [
            { name: "What is a Parisian wax?", value: 100 },
            { name: "What is a Californian wax?", value: 100 },
            { name: "What is intimate waxing?", value: 100 },
          ],
        },
      ],
    },
    {
      name: "Hipster Beard",
      category: "Beards",
      color: "#2b8bf8",
      value: level1Value,
      children: [
        {
          name: "Are beards hipster?",
          children: [
            { name: "Who started the beard trend?" },
            { name: "When did hipster beards start?" },
            { name: "What is beard slang for?" },
          ],
        },
        {
          name: "Do girls like beards?",
          children: [
            { name: "Do girls like bald men with beards?" },
            { name: "Do beards go gray first?" },
            { name: "Are bushy beards attractive?" },
          ],
        },
        {
          name: "What do you call a man with a beard?",
          children: [
            { name: "What does a Beard mean sexually?" },
            { name: "What do you call a man without a beard?" },
            { name: "What do you call a man who can't grow a beard" },
          ],
        },
        {
          name: "What religions allow beards?",
          children: [
            { name: "Did Jesus wear a beard?" },
            { name: "What does the Bible says about beards?" },
            { name: "What religion is it forbidden to shave?" },
            { name: "What religions require a beard?" },
          ],
        },
        {
          name: "Why are beards unprofessional?",
          children: [
            { name: "Are beards OK for interviews?" },
            { name: "Are beards dirty?" },
            { name: "Can chefs have beards?" },
          ],
        },
        {
          name: "How do hipsters grow beards?",
          children: [
            { name: "Why do hipsters have beards?" },
            { name: "Can blondes grow beards?" },
            { name: "What is a lumberjack beard?" },
          ],
        },
      ],
    },
    {
      name: "Beard Grooming",
      category: "Grooming",
      color: "#D6006D",
      value: level1Value,
      children: [
        {
          name: "Why does my beard look like pubes?",
          children: [
            { name: "Is beard hair like pubic hair?" },
            { name: "How do I stop my beard from curling?" },
            { name: "Should you straighten your beard?" },
          ],
        },
        {
          name: "What is a Neckbeard?",
          children: [
            { name: "How do I shape my beard neck?" },
            { name: "Where should my beard neckline be?" },
            { name: "What is a Neckbeard slang?" },
          ],
        },
        {
          name: "How dirty is a beard?",
          children: [
            { name: "Why are beards so dirty?" },
            { name: "Is there poop in beards?" },
            { name: "Can a man get lice in his beard?" },
          ],
        },
        {
          name: "When should you give up on your beard?",
          children: [
            { name: "Does brushing your beard help it grow?" },
            { name: "Will Beard fill in?" },
            { name: "Are beards attractive?" },
          ],
        },
        {
          name: "How long should you let your beard grow?",
          children: [
            { name: "Can all men grow beards?" },
            { name: "How do I stop my beard from itching?" },
            { name: "Do beard rollers work?" },
          ],
        },
        {
          name: "When should you first trim your beard?",
          children: [
            { name: "How long does the awkward beard stage last?" },
            { name: "What should a beard look like after 1 month?" },
            {
              name: "Should you trim your beard before or after a shower?",
            },
          ],
        },
      ],
    },
    {
      name: "Beard Jewellery",
      value: level1Value,
      color: "#2b8bf8",
      category: "Beards",
      children: [
        {
          name: "Where did beads in hair originate?",
          children: [
            { name: "How do you wear beard jewellery?" },
            { name: "How do you get beads in your hair?" },
            { name: "How do you use a beard loop threader?" },
            { name: "Did Vikings put beads in their beards?" },
          ],
        },
        {
          name: "Why do Vikings braid their beards?",
          children: [
            { name: "How do you do a Viking beard braid?" },
            { name: "How long does a beard have to be to braid?" },
            { name: "Is braiding your beard bad?" },
          ],
        },
        {
          name: "How do you make a Viking beard?",
          children: [
            { name: "What is a forked beard?" },
            { name: "Why does my beard fork?" },
            { name: "How do I trim my beard like a Viking?" },
          ],
        },
      ],
    },
    {
      name: "Facial Hair Growth",
      category: "Beards",
      color: "#2b8bf8",
      value: level1Value,
      children: [
        {
          name: "What foods cause facial hair growth?",
          children: [
            { name: "What foods reduce facial hair?" },
            { name: "What foods promote facial hair?" },
            { name: "Does milk cause facial hair?" },
            { name: "What vitamins reduce facial hair?" },
          ],
        },
        {
          name: "How do you stimulate hair follicles?",
          children: [
            { name: "How can you tell if hair follicles are alive?" },
            { name: "Which hormone makes your hair grow?" },
            { name: "How can I reopen my hair follicles?" },
          ],
        },
        {
          name: "How fast does facial hair grow per day?",
          children: [
            { name: "What are the stages of facial hair growth?" },
            { name: "Does facial hair mean you stop growing?" },
            { name: "Does brushing facial hair stimulate growth?" },
          ],
        },
        {
          name: "How long should you let your beard grow?",
          children: [
            { name: "How long is 10 day beard?" },
            { name: "How long does facial hair grow in a month?" },
            { name: "Do girls like beards?" },
          ],
        },
        {
          name: "How can teens grow facial hair faster?",
          children: [
            { name: "Is facial hair normal at 14?" },
            { name: "Can 15 year olds grow beards?" },
            { name: "Can you grow a beard if it's not in your genes?" },
            { name: "Does rubbing your chin make hair grow?" },
          ],
        },
      ],
    },
  ];

  networkSeries.dataFields.value = "value";
  networkSeries.dataFields.name = "name";

  networkSeries.dataFields.children = "children";
  networkSeries.dataFields.collapsed = "collapsed";
  networkSeries.dataFields.color = "color";
  networkSeries.nodes.template.tooltipText = "{name}";
  networkSeries.nodes.template.fillOpacity = 1;

  myTemplate = networkSeries.nodes.template;

  myTemplate.adapter.add("");

  var gradient = new am4core.LinearGradient();
  gradient.addColor(am4core.color("red"));
  gradient.addColor(am4core.color("blue"));

  fillModifier = new am4core.LinearGradientModifier();
  fillModifier.opacities = [0.6, 0.9, 1];
  fillModifier.offsets = [0, 0.5, 1];
  fillModifier.gradient = gradient;
  fillModifier.gradient.rotation = 90;
  networkSeries.nodes.template.fillModifier = fillModifier;
  networkSeries.nodes.template.fill = gradient;

  networkSeries.maxRadius = 80;
  networkSeries.minRadius = 65;

  networkSeries.maxLevels = 1;

  networkSeries.nodes.template.label.paddingLeft = 14;
  networkSeries.nodes.template.label.paddingRight = 14;
  networkSeries.nodes.template.label.text = "{name}";
  networkSeries.nodes.template.label.wrap = true;
  networkSeries.nodes.template.label.fontSize = "18px";

  networkSeries.nodes.template.expandAll = false;

  networkSeries.nodes.template.strokeWidth = 0;

  networkSeries.fontSize = 20;

  networkSeries.links.template.strokeWidth = 1;

  networkSeries.nodes.template.events.on("over", function (event) {
    event.target.dataItem.childLinks.each(function (link) {
      link.isHover = true;
    });
    if (event.target.dataItem.parentLink) {
      event.target.dataItem.parentLink.isHover = true;
    }
  });

  networkSeries.nodes.template.events.on("out", function (event) {
    event.target.dataItem.childLinks.each(function (link) {
      link.isHover = false;
    });
    if (event.target.dataItem.parentLink) {
      event.target.dataItem.parentLink.isHover = false;
    }
  });
}); // end am4core.ready()

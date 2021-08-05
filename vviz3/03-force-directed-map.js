var initForce = function () {
  $("#instructions--force").click(function () {
    $("#instructions--force").hide();
  });

  var el = document.getElementsByClassName("section-canvas");
  el.forEach((a) => {
    a.addEventListener("touchmove", function (a) {
      if ($(a.srcElement)[0].tagName == "circle") {
        $.scrollify.disable();
      } else {
        if ($.scrollify.isDisabled()) {
          $.scrollify.enable();
        }
      }
    });
  });

  var myTemplate;
  am4core.ready(function () {
    //    am4core.options.disableHoverOnTransform = "always";
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

    chart.data = [
      {
        name: "Beard Maintenance",
        category: "Beards",
        color: "#2b8bf8",
        children: [
          {
            name: "How do I maintain my beard?",
            children: [
              {
                name: "Does brushing beard stimulate growth",
              },
              { name: "Can you over brush your beard?" },
              {
                name: "Should you comb your wet or dry?",
              },
            ],
          },
          {
            name: "How can I thicken my beard?",
            collapsed: true,
            children: [
              {
                name: "Does trimming your beard help it grow?",
              },
              {
                name: "Does drinking water help grow beard?",
              },
              {
                name: "Does vaseline help with beard growth?",
              },
            ],
          },
          {
            name: "How do I shape my beard?",
            children: [
              {
                name: "How can I shape my beard at home?",
              },
              {
                name: "How do I shape my jawline beard?",
              },
              { name: "What your beard says about you?" },
            ],
          },
          {
            name: "What are the stages of growing a beard?",
            children: [
              { name: "Where should a beard end?" },
              {
                name: "How long does the awkward beard stage last?",
              },
              {
                name: "Should your mustache be shorter than your beard?",
              },
            ],
          },
          {
            name: "Can I wash my beard with just water?",
            children: [
              {
                name: "How often should beard be washed?",
              },
              { name: "Does Face Wash damage beard?" },
              {
                name: "Is salt water good for your beard?",
              },
            ],
          },
        ],
      },
      {
        name: "Male Grooming",
        color: "#D6006D",
        category: "Grooming",
        children: [
          {
            name: "What is it called when a man is well groomed?",
            children: [
              {
                name: "How do you describe a well groomed person?",
              },
              {
                name: "How do you always be well groomed?",
              },
              { name: "What is another word for neat?" },
            ],
          },
          {
            name: "How common is manscaping?",
            children: [
              { name: "Should males shave their armpits?" },
              { name: "How often should guys shave their pubes?" },
              { name: "What age should you start manscaping?" },
            ],
          },
          {
            name: "What does it mean if a guy shaves his legs?",
            children: [
              { name: "Is it wrong for a man to shave his legs?" },
              {
                name: "Is it acceptable for men to shave their legs?",
              },
              { name: "How do guys get rid of leg hair" },
            ],
          },
          {
            name: "Should I shave pubic hair for wedding night?",
            children: [
              { name: "Do models shave down there?" },
              {
                name: "How do you get rid of pubic hair without shaving or waxing?",
              },
              { name: "How short should a man trim his pubes?" },
              { name: "How do you groom your balls?" },
            ],
          },
        ],
      },
      {
        name: "Goatee Beard Styles",
        category: "Beards",
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
        color: "#E58100",
        children: [
          {
            name: "Should a man get waxed",
            children: [
              { name: "Does waxing hurt for guys?" },
              { name: "What is the most painful thing to wax" },
              {
                name: "Is it weird for a guy to get a Brazilian wax?",
              },
            ],
          },
          {
            name: "Can guys wax their private area",
            children: [
              {
                name: "Is it better to shave or wax your balls?",
              },
              {
                name: "Does shaving your balls make look bigger",
              },
              { name: "Do guys get hard when getting waxed?" },
            ],
          },
          {
            name: "Can you wax yourself at home?",
            children: [
              { name: "Is it cheaper to wax yourself?" },
              { name: "Can I wax my own back?" },
            ],
          },
          {
            name: "How long does male chest waxing last?",
            children: [
              { name: "What does chest hair say about a man?" },
              { name: "Does waxing men's chest hurt?" },
              { name: "Do men get their chest waxed?" },
            ],
          },
          {
            name: "What is Hollywood or Brazilian wax?",
            children: [
              { name: "What is a Parisian wax?" },
              { name: "What is a Californian wax?" },
              { name: "What is intimate waxing?" },
            ],
          },
        ],
      },
      {
        name: "Hipster Beard",
        category: "Beards",
        color: "#2b8bf8",
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

    networkSeries.dataFields.name = "name";

    networkSeries.dataFields.children = "children";
    networkSeries.dataFields.color = "color";

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

    networkSeries.maxRadius = 90;
    networkSeries.minRadius = 80;

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

    networkSeries.simplifiedProcessing = true;

    //networkSeries.centerStrength = 2;
    networkSeries.nodes.template.events.on("over", function (event) {
      event.target.dataItem.childLinks.each(function (link) {
        link.isHover = true;
      });
      if (event.target.dataItem.parentLink) {
        event.target.dataItem.parentLink.isHover = true;
      }
    });

    // networkSeries.events.on("dataitemsvalidated", function (event) {
    //   event.target.children.values.forEach((node) => {
    //     if ((node._className = "ForceDirectedTreeNode")) {
    //       node.isActive = true;
    //       node.isActive = false;
    //     }
    //   });
    // });

    networkSeries.nodes.template.events.on("out", function (event) {
      // $.scrollify.enable();
      event.target.dataItem.childLinks.each(function (link) {
        link.isHover = false;
      });
      if (event.target.dataItem.parentLink) {
        event.target.dataItem.parentLink.isHover = false;
      }
    });
  }); // end am4core.ready()
};

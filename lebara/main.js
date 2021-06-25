/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Disable scroll zoom
chart.chartContainer.wheelable = false;

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
polygonSeries.exclude = ["AQ", "AU"];

//Set min/max fill color for each area
polygonSeries.heatRules.push({
  property: "fill",
  target: polygonSeries.mapPolygons.template,
  min: chart.colors.getIndex(1).brighten(1),
  max: chart.colors.getIndex(1).brighten(-0.3),
  logarithmic: true,
});

// Make map load polygon data (state shapes and names) from GeoJSON
polygonSeries.useGeodata = true;

// Set heatmap values for each state
polygonSeries.data = [
  {
    Country: "India",
    calls: "0.2466837721211390",
    value: "0.26470072275629800",
    id: "IN",
  },
  {
    Country: "China",
    calls: "0.1065980239537310",
    value: "0.13248777863541700",
    id: "CN",
  },
  {
    Country: "Colombia",
    calls: "0.0618549126758003",
    value: "0.02967043248427010",
    id: "CO",
  },
  {
    Country: "United States",
    calls: "0.0446642215241132",
    value: "0.03995041283652610",
    id: "US",
  },
  {
    Country: "Bangladesh",
    calls: "0.0344603165611849",
    value: "0.02738404322503680",
    id: "BD",
  },
  {
    Country: "Pakistan",
    calls: "0.0304827825620751",
    value: "0.02533155568030310",
    id: "PK",
  },
  {
    Country: "Sri Lanka",
    calls: "0.0278571139404836",
    value: "0.01887586836011510",
    id: "LK",
  },
  {
    Country: "New Zealand",
    calls: "0.0275166345686653",
    value: "0.02508011133721610",
    id: "NZ",
  },
  {
    Country: "United Kingdom",
    calls: "0.0270661082762612",
    value: "0.02570579842350240",
    id: "GB",
  },
  {
    Country: "Malaysia",
    calls: "0.0243927747467839",
    value: "0.02213294973452160",
    id: "MY",
  },
  {
    Country: "Kenya",
    calls: "0.0243068570716703",
    value: "0.01409257829859890",
    id: "KE",
  },
  {
    Country: "Vietnam",
    calls: "0.0209063674613120",
    value: "0.03262928917268960",
    id: "VN",
  },
  {
    Country: "Thailand",
    calls: "0.0181985902773854",
    value: "0.01619769372909500",
    id: "TH",
  },
  {
    Country: "Nigeria",
    calls: "0.0155239803989317",
    value: "0.01406918812714900",
    id: "NG",
  },
  {
    Country: "Iran",
    calls: "0.0148089636169183",
    value: "0.01361307978387480",
    id: "IR",
  },
  {
    Country: "Canada",
    calls: "0.0122945872745583",
    value: "0.01264238766870160",
    id: "CA",
  },
  {
    Country: "Afghanistan",
    calls: "0.0117694894553794",
    value: "0.00992328023764414",
    id: "AF",
  },
  {
    Country: "Ethiopia",
    calls: "0.0094661464763456",
    value: "0.00808715177882254",
    id: "ET",
  },
  {
    Country: "Germany",
    calls: "0.0092446424239973",
    value: "0.01091736252426730",
    id: "DE",
  },
  {
    Country: "Spain",
    calls: "0.0091054446923644",
    value: "0.00611068229130120",
    id: "ES",
  },
  {
    Country: "Nepal",
    calls: "0.0090525711460913",
    value: "0.00998175566626903",
    id: "NP",
  },
  {
    Country: "Hong Kong",
    calls: "0.0088550424673411",
    value: "0.01513344092812200",
    id: "HK",
  },
  {
    Country: "Iraq",
    calls: "0.0086291109190832",
    value: "0.01024489509508100",
    id: "IQ",
  },
  {
    Country: "Philippines",
    calls: "0.0077662324300916",
    value: "0.01120389212452930",
    id: "PH",
  },
  {
    Country: "Italy",
    calls: "0.0077473586356174",
    value: "0.00657263817743784",
    id: "IT",
  },
  {
    Country: "Indonesia",
    calls: "0.0070330230914673",
    value: "0.00771875657848572",
    id: "ID",
  },
  {
    Country: "Poland",
    calls: "0.0066916732411948",
    value: "0.00418684068954225",
    id: "PL",
  },
  {
    Country: "Brazil",
    calls: "0.0064497377483737",
    value: "0.00412836526091736",
    id: "BR",
  },
  {
    Country: "Cambodia",
    calls: "0.0060918591020386",
    value: "0.00591186583397656",
    id: "KH",
  },
  {
    Country: "Zone 1",
    calls: "0.0060679239258844",
    value: "0.01491123429934740",
    id: "#N/A",
  },
  {
    Country: "Lebanon",
    calls: "0.0058771968162751",
    value: "0.00713984983509929",
    id: "LB",
  },
  {
    Country: "CallForward",
    calls: "0.0050766868225018",
    value: "0.01072439360980520",
    id: "#N/A",
  },
  {
    Country: "Singapore",
    calls: "0.0050652531246496",
    value: "0.00630949874862583",
    id: "SG",
  },
  {
    Country: "Peru",
    calls: "0.0049978084040293",
    value: "0.00280097303113232",
    id: "PE",
  },
  {
    Country: "France",
    calls: "0.0047723870194435",
    value: "0.00459616868991650",
    id: "FR",
  },
  {
    Country: "Greece",
    calls: "0.0045844322031708",
    value: "0.00480083269010362",
    id: "GR",
  },
  {
    Country: "Korea South",
    calls: "0.0044809377345125",
    value: "0.00609313966271373",
    id: "KR",
  },
  {
    Country: "Chile",
    calls: "0.0042266857798507",
    value: "0.00286529600261970",
    id: "CL",
  },
  {
    Country: "United Arab Emirates",
    calls: "0.0041108373613992",
    value: "0.00527448366196524",
    id: "AE",
  },
  {
    Country: "Egypt",
    calls: "0.0038919377170511",
    value: "0.00519846560475288",
    id: "EG",
  },
  {
    Country: "Ireland",
    calls: "0.0038191679049090",
    value: "0.00241503520220803",
    id: "IE",
  },
  {
    Country: "Fiji",
    calls: "0.0036610621892100",
    value: "0.00429209646106706",
    id: "FJ",
  },
  {
    Country: "Sudan",
    calls: "0.0036539020697343",
    value: "0.00396463406076767",
    id: "SD",
  },
  {
    Country: "Western Samoa",
    calls: "0.0036159090373554",
    value: "0.00214020068767104",
    id: "WS",
  },
  {
    Country: "Turkey",
    calls: "0.0034472437142602",
    value: "0.00352606834608098",
    id: "TR",
  },
  {
    Country: "Myanmar",
    calls: "0.0032691843681709",
    value: "0.00247351063083292",
    id: "MM",
  },
  {
    Country: "Somalia",
    calls: "0.0030667566609441",
    value: "0.00230977943068323",
    id: "SO",
  },
  {
    Country: "South Sudan",
    calls: "0.0030667146935095",
    value: "0.00539728206207751",
    id: "SS",
  },
  {
    Country: "Uganda",
    calls: "0.0030257856560878",
    value: "0.00350267817463102",
    id: "UG",
  },
  {
    Country: "Ghana",
    calls: "0.0030157945223315",
    value: "0.00278927794540734",
    id: "GH",
  },
  {
    Country: "Taiwan",
    calls: "0.0029455882524583",
    value: "0.00371318971768063",
    id: "TW",
  },
  {
    Country: "Argentina",
    calls: "0.0027532740764572",
    value: "0.00168993988725937",
    id: "AR",
  },
  {
    Country: "South Africa",
    calls: "0.0025081117531530",
    value: "0.00329216663158141",
    id: "ZA",
  },
  {
    Country: "Mexico",
    calls: "0.0023959609521413",
    value: "0.00189460388744649",
    id: "MX",
  },
  {
    Country: "Liberia",
    calls: "0.0022717935441169",
    value: "0.00202324983042126",
    id: "LR",
  },
  {
    Country: "Qatar",
    calls: "0.0021378657551756",
    value: "0.00231562697354572",
    id: "QA",
  },
  {
    Country: "Japan",
    calls: "0.0020691918347226",
    value: "0.00242088274507052",
    id: "JP",
  },
  {
    Country: "Netherlands",
    calls: "0.0020135977482045",
    value: "0.00215189577339602",
    id: "NL",
  },
  {
    Country: "Sweden",
    calls: "0.0018780622173253",
    value: "0.00243257783079550",
    id: "SE",
  },
  {
    Country: "Czech Republic",
    calls: "0.0018030356732207",
    value: "0.00112857577246041",
    id: "CZ",
  },
  {
    Country: "Jordan",
    calls: "0.0017851978353471",
    value: "0.00179519565878418",
    id: "JO",
  },
  {
    Country: "Syria",
    calls: "0.0016955862331333",
    value: "0.00267817463102005",
    id: "SY",
  },
  {
    Country: "Saudi Arabia",
    calls: "0.0015554179132763",
    value: "0.00172502514443431",
    id: "SA",
  },
  {
    Country: "Tonga",
    calls: "0.0013504064033997",
    value: "0.00077772320071106",
    id: "TO",
  },
  {
    Country: "Papua New Guinea",
    calls: "0.0013057329090275",
    value: "0.00088297897223587",
    id: "PG",
  },
  {
    Country: "Switzerland",
    calls: "0.0012739392694836",
    value: "0.00151451360138470",
    id: "CH",
  },
  {
    Country: "Romania",
    calls: "0.0012687105123953",
    value: "0.00117535611536033",
    id: "RO",
  },
  {
    Country: "Russia",
    calls: "0.0012536934987334",
    value: "0.00116950857249784",
    id: "RU",
  },
  {
    Country: "Portugal",
    calls: "0.0011610230194854",
    value: "0.00110518560101046",
    id: "PT",
  },
  {
    Country: "Vanuatu",
    calls: "0.0011500208564298",
    value: "0.00089467405796085",
    id: "VU",
  },
  {
    Country: "Israel",
    calls: "0.0011140123888864",
    value: "0.00080111337216102",
    id: "IL",
  },
  {
    Country: "Zimbabwe",
    calls: "0.0010504891250119",
    value: "0.00161392183004701",
    id: "ZW",
  },
  {
    Country: "Slovakia",
    calls: "0.0009852371277260",
    value: "0.00060814445769888",
    id: "SK",
  },
  {
    Country: "Mauritius",
    calls: "0.0009673066212855",
    value: "0.00172502514443431",
    id: "MU",
  },
  {
    Country: "Sierra Leone",
    calls: "0.0009461669363808",
    value: "0.00180104320164667",
    id: "SL",
  },
  {
    Country: "Belgium",
    calls: "0.0008983700045998",
    value: "0.00088297897223587",
    id: "BE",
  },
  {
    Country: "Eritrea",
    calls: "0.0008731387245150",
    value: "0.00118705120108530",
    id: "ER",
  },
  {
    Country: "Dem. Rep. Congo",
    calls: "0.0008596373557333",
    value: "0.00104671017238556",
    id: "CD",
  },
  {
    Country: "Serbia",
    calls: "0.0008332565313687",
    value: "0.00108179542956050",
    id: "RS",
  },
  {
    Country: "Guinea",
    calls: "0.0008103152366155",
    value: "0.00081280845788600",
    id: "GN",
  },
  {
    Country: "Denmark",
    calls: "0.0007647706656990",
    value: "0.00084204617219844",
    id: "DK",
  },
  {
    Country: "Norway",
    calls: "0.0007313119387502",
    value: "0.00070170514349870",
    id: "NO",
  },
  {
    Country: "Austria",
    calls: "0.0006936814627564",
    value: "0.00063738217201132",
    id: "AT",
  },
  {
    Country: "Burundi",
    calls: "0.0006920543105074",
    value: "0.00061983954342385",
    id: "BI",
  },
  {
    Country: "Morocco",
    calls: "0.0006475439371520",
    value: "0.00062568708628634",
    id: "MA",
  },
  {
    Country: "Algeria",
    calls: "0.0006255756934983",
    value: "0.00073094285781115",
    id: "DZ",
  },
  {
    Country: "Mongolia",
    calls: "0.0005996043676996",
    value: "0.00033915748602437",
    id: "MN",
  },
  {
    Country: "Hungary",
    calls: "0.0005852350559118",
    value: "0.00061399200056136",
    id: "HU",
  },
  {
    Country: "Laos",
    calls: "0.0005594368063994",
    value: "0.00060229691483639",
    id: "LA",
  },
  {
    Country: "Tunisia",
    calls: "0.0005505038280422",
    value: "0.00036839520033682",
    id: "TN",
  },
  {
    Country: "Venezuela",
    calls: "0.0005467411120723",
    value: "0.00045026080041167",
    id: "VE",
  },
  {
    Country: "Malta",
    calls: "0.0005463336515620",
    value: "0.00096484457231072",
    id: "MT",
  },
  {
    Country: "Rwanda",
    calls: "0.0005046411635972",
    value: "0.00053212640048652",
    id: "RW",
  },
  {
    Country: "Yemen",
    calls: "0.0004981594658870",
    value: "0.00032746240029939",
    id: "YE",
  },
  {
    Country: "Macedonia",
    calls: "0.0004872316110607",
    value: "0.00069001005777372",
    id: "MK",
  },
  {
    Country: "Tokelau",
    calls: "0.0004615903536450",
    value: "0.00023974925736206",
    id: "TK",
  },
  {
    Country: "Kuwait",
    calls: "0.0004500488455113",
    value: "0.00032161485743691",
    id: "KW",
  },
  {
    Country: "Croatia",
    calls: "0.0004440667631304",
    value: "0.00052627885762403",
    id: "HR",
  },
  {
    Country: "Lithuania",
    calls: "0.0004416970286497",
    value: "0.00040348045751175",
    id: "LT",
  },
  {
    Country: "Tanzania",
    calls: "0.0004400365156579",
    value: "0.00067246742918626",
    id: "TZ",
  },
  {
    Country: "MMS: Video",
    calls: "0.0004207520183473",
    value: "0.00046780342899914",
    id: "#N/A",
  },
  {
    Country: "Albania",
    calls: "0.0003933313174913",
    value: "0.00028068205739948",
    id: "AL",
  },
  {
    Country: "Ukraine",
    calls: "0.0003671406666543",
    value: "0.00047949851472411",
    id: "UA",
  },
  {
    Country: "Libya",
    calls: "0.0003647944057620",
    value: "0.00046780342899914",
    id: "LY",
  },
  {
    Country: "Ecuador",
    calls: "0.0003491097528408",
    value: "0.00026898697167450",
    id: "EC",
  },
  {
    Country: "Bosnia And Herzegovina",
    calls: "0.0003394678802799",
    value: "0.00042687062896171",
    id: "BA",
  },
  {
    Country: "Finland",
    calls: "0.0003225604464530",
    value: "0.00032161485743691",
    id: "FI",
  },
  {
    Country: "Cyprus",
    calls: "0.0003133413396634",
    value: "0.00064907725773630",
    id: "CY",
  },
  {
    Country: "Kiribati",
    calls: "0.0002938251824597",
    value: "0.00026313942881201",
    id: "KI",
  },
  {
    Country: "Zambia",
    calls: "0.0002912081159696",
    value: "0.00043271817182420",
    id: "ZM",
  },
  {
    Country: "Bahrain",
    calls: "0.0002642326533740",
    value: "0.00014034102869974",
    id: "BH",
  },
  {
    Country: "Cameroon",
    calls: "0.0002502671677892",
    value: "0.00018127382873717",
    id: "CM",
  },
  {
    Country: "New Caledonia",
    calls: "0.0002435491024019",
    value: "0.00027483451453699",
    id: "NC",
  },
  {
    Country: "Bhutan",
    calls: "0.0002416859547280",
    value: "0.00036254765747433",
    id: "BT",
  },
  {
    Country: "El Salvador",
    calls: "0.0002381813564565",
    value: "0.00041517554323673",
    id: "SV",
  },
  {
    Country: "Uruguay",
    calls: "0.0002336274829680",
    value: "0.00026898697167450",
    id: "UY",
  },
  {
    Country: "Cook Islands",
    calls: "0.0002169546616918",
    value: "0.00007601805721236",
    id: "CK",
  },
  {
    Country: "Solomon Islands",
    calls: "0.0002094256967434",
    value: "0.00018712137159965",
    id: "SB",
  },
  {
    Country: "East Timor",
    calls: "0.0002070491172358",
    value: "0.00033915748602437",
    id: "TL",
  },
  {
    Country: "Seychelles",
    calls: "0.0001928492673449",
    value: "0.00021635908591210",
    id: "SC",
  },
  {
    Country: "Nicaragua",
    calls: "0.0001864336722233",
    value: "0.00008771314293734",
    id: "NI",
  },
  {
    Country: "Macao",
    calls: "0.0001808136544877",
    value: "0.00023974925736206",
    id: "MO",
  },
  {
    Country: "Bulgaria",
    calls: "0.0001746583848385",
    value: "0.00012279840011227",
    id: "BG",
  },
  {
    Country: "Malawi",
    calls: "0.0001723615036742",
    value: "0.00017542628587468",
    id: "MW",
  },
  {
    Country: "Guinea Bissau",
    calls: "0.0001702670940375",
    value: "0.00017542628587468",
    id: "GW",
  },
  {
    Country: "American Samoa",
    calls: "0.0001619022326157",
    value: "0.00002923771431245",
    id: "AS",
  },
  {
    Country: "Nauru",
    calls: "0.0001613918493343",
    value: "0.00010525577152481",
    id: "NR",
  },
  {
    Country: "Kazakhstan",
    calls: "0.0001545753192924",
    value: "0.00016957874301219",
    id: "KZ",
  },
  {
    Country: "Uzbekistan",
    calls: "0.0001523706992286",
    value: "0.00009940822866232",
    id: "UZ",
  },
  {
    Country: "Latvia",
    calls: "0.0001390743131648",
    value: "0.00010525577152481",
    id: "LV",
  },
  {
    Country: "Oman",
    calls: "0.0001195442028913",
    value: "0.00024559680022455",
    id: "OM",
  },
  {
    Country: "Georgia",
    calls: "0.0001188784782154",
    value: "0.00012864594297476",
    id: "GE",
  },
  {
    Country: "Djibouti",
    calls: "0.0001180694078239",
    value: "0.00012864594297476",
    id: "DJ",
  },
  {
    Country: "Jamaica",
    calls: "0.0001161539712131",
    value: "0.00008771314293734",
    id: "JM",
  },
  {
    Country: "Estonia",
    calls: "0.0001132131832283",
    value: "0.00012864594297476",
    id: "EE",
  },
  {
    Country: "Botswana",
    calls: "0.0001129460750380",
    value: "0.00028652960026197",
    id: "BW",
  },
  {
    Country: "Chad",
    calls: "0.0001069351798686",
    value: "0.00016373120014970",
    id: "TD",
  },
  {
    Country: "Panama",
    calls: "0.0001066155738274",
    value: "0.00005847542862489",
    id: "PA",
  },
  {
    Country: "Senegal",
    calls: "0.0000975800096241",
    value: "0.00019296891446214",
    id: "SN",
  },
  {
    Country: "Haiti",
    calls: "0.0000956081114632",
    value: "0.00010525577152481",
    id: "HT",
  },
  {
    Country: "Costa Rica",
    calls: "0.0000946969537070",
    value: "0.00006432297148738",
    id: "CR",
  },
  {
    Country: "Belarus",
    calls: "0.0000862252700971",
    value: "0.00009940822866232",
    id: "BY",
  },
  {
    Country: "Messenger",
    calls: "0.0000842131127223",
    value: "0.00022220662877459",
    id: "#N/A",
  },
  {
    Country: "Guatemala",
    calls: "0.0000763239816764",
    value: "0.00003508525717494",
    id: "GT",
  },
  {
    Country: "IDD SMS Hungary",
    calls: "0.0000726122243438",
    value: "0.00011110331438729",
    id: "#N/A",
  },
  {
    Country: "Slovenia",
    calls: "0.0000720290836582",
    value: "0.00019296891446214",
    id: "SI",
  },
  {
    Country: "Gambia",
    calls: "0.0000684044832584",
    value: "0.00007601805721236",
    id: "GM",
  },
  {
    Country: "Togo",
    calls: "0.0000681477065673",
    value: "0.00002339017144996",
    id: "TG",
  },
  {
    Country: "Mali",
    calls: "0.0000647683313461",
    value: "0.00005847542862489",
    id: "ML",
  },
  {
    Country: "Comoros",
    calls: "0.0000637510770288",
    value: "0.00011110331438729",
    id: "KM",
  },
  {
    Country: "Ascension Islands",
    calls: "0.0000613810765225",
    value: "0.00004678034289991",
    id: "SH",
  },
  {
    Country: "Antarctica",
    calls: "0.0000595163116604",
    value: "0.00001754262858747",
    id: "AQ",
  },
  {
    Country: "Kyrgyzstan",
    calls: "0.0000589144779644",
    value: "0.00004093280003742",
    id: "KG",
  },
  {
    Country: "Swaziland",
    calls: "0.0000567678607552",
    value: "0.00003508525717494",
    id: "SZ",
  },
  {
    Country: "French Polynesia",
    calls: "0.0000547653235925",
    value: "0.00005847542862489",
    id: "PF",
  },
  {
    Country: "Guyana",
    calls: "0.0000461555897098",
    value: "0.00004093280003742",
    id: "GY",
  },
  {
    Country: "Cuba",
    calls: "0.0000456561732205",
    value: "0.00005847542862489",
    id: "CU",
  },
  {
    Country: "Madagascar",
    calls: "0.0000448201644218",
    value: "0.00007601805721236",
    id: "MG",
  },
  {
    Country: "Luxembourg",
    calls: "0.0000436445496391",
    value: "0.00001754262858747",
    id: "LU",
  },
  {
    Country: "Ivory Coast",
    calls: "0.0000419929344898",
    value: "0.00007017051434987",
    id: "CI",
  },
  {
    Country: "Moldova",
    calls: "0.0000406578261608",
    value: "0.00007017051434987",
    id: "MD",
  },
  {
    Country: "Mauritania",
    calls: "0.0000382585977482",
    value: "0.00005262788576240",
    id: "MR",
  },
  {
    Country: "Tuvalu",
    calls: "0.0000360480038404",
    value: "0.00001754262858747",
    id: "TV",
  },
  {
    Country: "Paraguay",
    calls: "0.0000358557605807",
    value: "0.00004093280003742",
    id: "PY",
  },
  {
    Country: "Reunion",
    calls: "0.0000354527715944",
    value: "0.00004678034289991",
    id: "RE",
  },
  {
    Country: "Azerbaijan",
    calls: "0.0000335510131941",
    value: "0.00004093280003742",
    id: "AZ",
  },
  {
    Country: "Bolivia",
    calls: "0.0000329724933514",
    value: "0.00005262788576240",
    id: "BO",
  },
  {
    Country: "Burkina Faso",
    calls: "0.0000326595369931",
    value: "0.00005847542862489",
    id: "BF",
  },
  {
    Country: "Palestine",
    calls: "0.0000324555968609",
    value: "0.00012864594297476",
    id: "PS",
  },
  {
    Country: "Montenegro",
    calls: "0.0000316170060767",
    value: "0.00004678034289991",
    id: "ME",
  },
  {
    Country: "Trinidad And Tobago",
    calls: "0.0000284393145911",
    value: "0.00004093280003742",
    id: "TT",
  },
  {
    Country: "Armenia",
    calls: "0.0000273119294394",
    value: "0.00005847542862489",
    id: "AM",
  },
  {
    Country: "Benin",
    calls: "0.0000251596078145",
    value: "0.00002923771431245",
    id: "BJ",
  },
  {
    Country: "Suriname",
    calls: "0.0000249425339451",
    value: "0.00003508525717494",
    id: "SR",
  },
  {
    Country: "Namibia",
    calls: "0.0000242890669372",
    value: "0.00004678034289991",
    id: "NA",
  },
  {
    Country: "Tajikistan",
    calls: "0.0000235022063650",
    value: "0.00002339017144996",
    id: "TJ",
  },
  {
    Country: "Central African Republic",
    calls: "0.0000231387737560",
    value: "0.00007017051434987",
    id: "CF",
  },
  {
    Country: "Norfolk Islands",
    calls: "0.0000218782678841",
    value: "0.00002923771431245",
    id: "NF",
  },
  {
    Country: "Andorra",
    calls: "0.0000172150033251",
    value: "0.00001169508572498",
    id: "AD",
  },
  {
    Country: "Dominican Republic",
    calls: "0.0000126926846714",
    value: "0.00002923771431245",
    id: "DO",
  },
  {
    Country: "Congo",
    calls: "0.0000120903984592",
    value: "0.00002339017144996",
    id: "CG",
  },
  {
    Country: "Brunei Darussalam",
    calls: "0.0000107340445600",
    value: "0.00007601805721236",
    id: "BN",
  },
  {
    Country: "Honduras",
    calls: "0.0000106162090320",
    value: "0.00002923771431245",
    id: "HN",
  },
  {
    Country: "Greenland",
    calls: "0.0000093313838280",
    value: "0.00000584754286249",
    id: "GL",
  },
  {
    Country: "Puerto Rico",
    calls: "0.0000089801416687",
    value: "0.00002923771431245",
    id: "PR",
  },
  {
    Country: "Bahamas",
    calls: "0.0000088449852903",
    value: "0.00000584754286249",
    id: "BS",
  },
  {
    Country: "Liechtenstein",
    calls: "0.0000084615450340",
    value: "0.00001169508572498",
    id: "LI",
  },
  {
    Country: "Lesotho",
    calls: "0.0000078812215883",
    value: "0.00000584754286249",
    id: "LS",
  },
  {
    Country: "Wallis and Futuna Islands",
    calls: "0.0000074565827782",
    value: "0.00000584754286249",
    id: "WF",
  },
  {
    Country: "Belize",
    calls: "0.0000073517931611",
    value: "0.00001754262858747",
    id: "BZ",
  },
  {
    Country: "Maldives",
    calls: "0.0000067755595540",
    value: "0.00003508525717494",
    id: "MV",
  },
  {
    Country: "Angola",
    calls: "0.0000063665122218",
    value: "0.00000584754286249",
    id: "AO",
  },
  {
    Country: "Netherlands Antilles",
    calls: "0.0000062674859701",
    value: "0.00001754262858747",
    id: "AN",
  },
  {
    Country: "Barbados",
    calls: "0.0000060754797604",
    value: "0.00000584754286249",
    id: "BB",
  },
  {
    Country: "Niue",
    calls: "0.0000056742651683",
    value: "0.00001169508572498",
    id: "NU",
  },
  {
    Country: "Iceland",
    calls: "0.0000056690380999",
    value: "0.00002923771431245",
    id: "IS",
  },
  {
    Country: "Mozambique",
    calls: "0.0000049591836962",
    value: "0.00003508525717494",
    id: "MZ",
  },
  {
    Country: "Niger",
    calls: "0.0000043601199726",
    value: "0.00002339017144996",
    id: "NE",
  },
  {
    Country: "Mariana Islands",
    calls: "0.0000033889349855",
    value: "0.00001169508572498",
    id: "MP",
  },
  {
    Country: "Aruba",
    calls: "0.0000021679218879",
    value: "0.00001754262858747",
    id: "AW",
  },
  {
    Country: "Antigua and Barbuda",
    calls: "0.0000012889641451",
    value: "0.00000584754286249",
    id: "AG",
  },
  {
    Country: "Kosovo",
    calls: "0.0000011374407455",
    value: "0.00000584754286249",
    id: "XK",
  },
  {
    Country: "Gabon",
    calls: "0.0000008353530078",
    value: "0.00001169508572498",
    id: "GA",
  },
  {
    Country: "Cayman Islands",
    calls: "0.0000004391758266",
    value: "0.00000584754286249",
    id: "KY",
  },
  {
    Country: "Gibraltar",
    calls: "0.0000002860313615",
    value: "0.00002339017144996",
    id: "GI",
  },
  {
    Country: "Anguilla",
    calls: "0.0000002849439169",
    value: "0.00000584754286249",
    id: "AI",
  },
  {
    Country: "Guam",
    calls: "0.0000002212706602",
    value: "0.00000584754286249",
    id: "GU",
  },
  {
    Country: "St. Vincent and the Grenadines",
    calls: "0.0000000386352058",
    value: "0.00000584754286249",
    id: "VC",
  },
  {
    Country: "Grenada",
    calls: "0.0000000327214783",
    value: "0.00001169508572498",
    id: "GD",
  },
  {
    Country: "Guadeloupe",
    calls: "0.0000000000000000",
    value: "0.00000584754286249",
    id: "GP",
  },
  {
    Country: "St. Lucia",
    calls: "0.0000000000000000",
    value: "0.00000584754286249",
    id: "LC",
  },
];

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
polygonSeries.calculatePercent = true;
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipHTML =
  "<div class='tooltip'>" +
  "<strong>{name}</strong>" +
  "<div>Calls to this country: {value.percent}%</div>" +
  "<div><a href='/how-to-call-{id}'>How to call {name}</a></div>" +
  "<div><a href='/how-to-call-{id}'>Rates for calling {name}</a></div>" +
  "</div>";
polygonTemplate.nonScalingStroke = true;
polygonTemplate.strokeWidth = 0.5;

//Set up tooltips
polygonSeries.calculateVisualCenter = true;
polygonTemplate.tooltipPosition = "fixed";
polygonSeries.tooltip.label.interactionsEnabled = true;
polygonSeries.tooltip.keepTargetHover = true;
polygonSeries.tooltip.pointerOrientation = "horizontal";

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#ef3a8b");

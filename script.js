
const TOPICS = {
  daily: {
    label: "Daily life",
    starters: ["work","home","busy","tired","good","bad","today","day"],
    nodes: {
      start: {
        q:"How was your day?", jp:"今日はどんな一日だった？", mood:"happy", gesture:"wave",
        choices:[
          {en:"It was busy at work.",jp:"仕事で忙しかった。",next:"busy"},
          {en:"It was relaxing. I stayed home.",jp:"ゆっくりした一日で、家にいた。",next:"home"},
          {en:"It was a little tiring.",jp:"少し疲れる一日だった。",next:"tired"}
        ]
      },
      busy: {
        q:"What made you so busy?",jp:"何でそんなに忙しかったの？",mood:"think",gesture:"nod",
        choices:[
          {en:"I had several meetings.",jp:"会議がいくつかあった。",next:"meetings",set:{work:"meetings"}},
          {en:"I worked on an important report.",jp:"大切なレポートに取り組んだ。",next:"report",set:{work:"report"}},
          {en:"A new project started.",jp:"新しいプロジェクトが始まった。",next:"project",set:{work:"project"}}
        ]
      },
      meetings: {
        q:"Were the meetings useful, or did they feel too long?",jp:"会議は役に立った？それとも長すぎた？",mood:"think",gesture:"shrug",
        choices:[
          {en:"They were useful.",jp:"役に立った。",next:"positiveWork"},
          {en:"They were too long.",jp:"長すぎた。",next:"stress"},
          {en:"Some were useful, but not all.",jp:"役に立つものもあったけど、全部ではなかった。",next:"balanced"}
        ]
      },
      report: {
        q:"What was the report about?",jp:"そのレポートは何について？",mood:"think",gesture:"explain",
        choices:[
          {en:"It was about our monthly results.",jp:"月次結果についてだった。",next:"positiveWork"},
          {en:"It was about a new plan.",jp:"新しい計画についてだった。",next:"project"},
          {en:"It was confidential.",jp:"機密の内容だった。",next:"confidential"}
        ]
      },
      project: {
        q:"Are you excited about the new project?",jp:"その新しいプロジェクトは楽しみ？",mood:"happy",gesture:"explain",
        choices:[
          {en:"Yes, it looks interesting.",jp:"うん、面白そう。",next:"positiveWork"},
          {en:"I’m a little nervous.",jp:"少し不安。",next:"stress"},
          {en:"I’m not sure yet.",jp:"まだよく分からない。",next:"balanced"}
        ]
      },
      positiveWork: {
        q:"What part of your work do you enjoy most?",jp:"仕事のどんなところが一番好き？",mood:"happy",gesture:"nod",
        choices:[
          {en:"I like solving problems.",jp:"問題を解決するのが好き。",next:"skills",set:{favoriteWork:"solving problems"}},
          {en:"I enjoy working with people.",jp:"人と一緒に働くのが好き。",next:"people",set:{favoriteWork:"working with people"}},
          {en:"I like finishing difficult tasks.",jp:"難しい仕事を終えるのが好き。",next:"achievement",set:{favoriteWork:"finishing difficult tasks"}}
        ]
      },
      stress: {
        q:"What helps you relax after a stressful day?",jp:"ストレスの多い一日の後、どうやってリラックスする？",mood:"sad",gesture:"nod",
        choices:[
          {en:"I watch movies.",jp:"映画を見る。",next:"movie",set:{relax:"movies"}},
          {en:"I listen to music.",jp:"音楽を聴く。",next:"music",set:{relax:"music"}},
          {en:"I spend time with my family.",jp:"家族と過ごす。",next:"family",set:{relax:"family"}}
        ]
      },
      balanced: {
        q:"That makes sense. What would make tomorrow better?",jp:"なるほど。明日をもっと良くするには何が必要？",mood:"think",gesture:"nod",
        choices:[
          {en:"Fewer meetings would help.",jp:"会議が少ないと助かる。",next:"future"},
          {en:"I need more time to focus.",jp:"集中する時間がもっと必要。",next:"future"},
          {en:"I’d like a quieter day.",jp:"もっと静かな一日がいい。",next:"future"}
        ]
      },
      confidential: {
        q:"No problem—you don’t have to share details. Was it difficult?",jp:"大丈夫、詳しく話さなくていいよ。難しかった？",mood:"think",gesture:"nod",
        choices:[
          {en:"Yes, it was challenging.",jp:"うん、難しかった。",next:"achievement"},
          {en:"It was manageable.",jp:"何とか対応できた。",next:"balanced"},
          {en:"I had help from my team.",jp:"チームに助けてもらった。",next:"people"}
        ]
      },
      skills: {
        q:"You sound like a problem-solver. Is that something you’ve always been good at?",jp:"問題解決が得意そうだね。昔から得意だった？",mood:"happy",gesture:"explain",
        choices:[
          {en:"Yes, I’ve always liked puzzles.",jp:"うん、昔からパズルが好き。",next:"hobbyBridge"},
          {en:"I learned it through work.",jp:"仕事を通して身につけた。",next:"career"},
          {en:"I’m still improving.",jp:"今も上達している途中。",next:"future"}
        ]
      },
      people: {
        q:"What makes someone easy to work with?",jp:"一緒に働きやすい人って、どんな人？",mood:"think",gesture:"explain",
        choices:[
          {en:"Someone who communicates clearly.",jp:"分かりやすく話す人。",next:"communication"},
          {en:"Someone who is reliable.",jp:"信頼できる人。",next:"trust"},
          {en:"Someone with a good sense of humor.",jp:"ユーモアのある人。",next:"humor"}
        ]
      },
      achievement: {
        q:"How do you reward yourself after finishing something difficult?",jp:"難しいことを終えた後、自分にどんなご褒美をあげる？",mood:"happy",gesture:"wave",
        choices:[
          {en:"I have a nice meal.",jp:"おいしいものを食べる。",next:"foodBridge"},
          {en:"I buy something small.",jp:"小さなものを買う。",next:"shoppingBridge"},
          {en:"I simply relax.",jp:"ただゆっくりする。",next:"home"}
        ]
      },
      home: {
        q:"What do you usually do when you stay home?",jp:"家にいるときは普段何をする？",mood:"happy",gesture:"nod",
        choices:[
          {en:"I watch movies or TV.",jp:"映画やテレビを見る。",next:"movie",set:{homeActivity:"movies"}},
          {en:"I read or listen to music.",jp:"本を読んだり音楽を聴いたりする。",next:"music",set:{homeActivity:"reading or music"}},
          {en:"I spend time with my family.",jp:"家族と過ごす。",next:"family",set:{homeActivity:"family"}}
        ]
      },
      tired: {
        q:"Was it physical tiredness or mental tiredness?",jp:"体が疲れた？それとも頭が疲れた？",mood:"sad",gesture:"nod",
        choices:[
          {en:"Mostly mental tiredness.",jp:"主に頭の疲れ。",next:"stress"},
          {en:"Mostly physical tiredness.",jp:"主に体の疲れ。",next:"health"},
          {en:"A bit of both.",jp:"両方少しずつ。",next:"sleep"}
        ]
      },
      movie: {
        q:"What kind of movies do you enjoy?",jp:"どんな映画が好き？",mood:"happy",gesture:"explain",
        choices:[
          {en:"I like action movies.",jp:"アクション映画が好き。",next:"recommend",set:{movie:"action"}},
          {en:"I prefer comedies.",jp:"コメディーが好き。",next:"humor",set:{movie:"comedy"}},
          {en:"I like dramas.",jp:"ドラマが好き。",next:"emotion",set:{movie:"drama"}}
        ]
      },
      music: {
        q:"When do you usually listen to music?",jp:"普段いつ音楽を聴く？",mood:"happy",gesture:"nod",
        choices:[
          {en:"On my way to work.",jp:"通勤中。",next:"commute"},
          {en:"When I’m relaxing at home.",jp:"家でリラックスするとき。",next:"home"},
          {en:"Before I go to sleep.",jp:"寝る前。",next:"sleep"}
        ]
      },
      family: {
        q:"What do you enjoy doing with your family?",jp:"家族とは何をして過ごすのが好き？",mood:"happy",gesture:"wave",
        choices:[
          {en:"We have dinner together.",jp:"一緒に夕食を食べる。",next:"foodBridge"},
          {en:"We watch TV or movies.",jp:"一緒にテレビや映画を見る。",next:"movie"},
          {en:"We talk about our day.",jp:"一日のことを話す。",next:"memoryCheck"}
        ]
      },
      health: {
        q:"Do you do anything to stay healthy?",jp:"健康のために何かしている？",mood:"think",gesture:"nod",
        choices:[
          {en:"I try to walk every day.",jp:"毎日歩くようにしている。",next:"exercise",set:{health:"walking"}},
          {en:"I watch what I eat.",jp:"食事に気をつけている。",next:"foodBridge",set:{health:"diet"}},
          {en:"Not enough, honestly.",jp:"正直、十分にはしていない。",next:"future"}
        ]
      },
      sleep: {
        q:"How well did you sleep last night?",jp:"昨夜はよく眠れた？",mood:"think",gesture:"nod",
        choices:[
          {en:"I slept well.",jp:"よく眠れた。",next:"future"},
          {en:"I woke up several times.",jp:"何度か目が覚めた。",next:"stress"},
          {en:"I went to bed too late.",jp:"寝るのが遅すぎた。",next:"habit"}
        ]
      },
      future: {
        q:"What is one small thing you’d like to improve this week?",jp:"今週、少し改善したいことは何？",mood:"think",gesture:"explain",
        choices:[
          {en:"I want to sleep earlier.",jp:"もっと早く寝たい。",next:"habit",set:{goal:"sleep earlier"}},
          {en:"I want to exercise more.",jp:"もっと運動したい。",next:"exercise",set:{goal:"exercise more"}},
          {en:"I want to practice English every day.",jp:"毎日英語を練習したい。",next:"englishGoal",set:{goal:"practice English"}}
        ]
      },
      habit: {
        q:"What usually gets in the way?",jp:"普段、何が邪魔になる？",mood:"think",gesture:"shrug",
        choices:[
          {en:"I lose track of time.",jp:"時間を忘れてしまう。",next:"solution"},
          {en:"I’m too busy.",jp:"忙しすぎる。",next:"solution"},
          {en:"I don’t have a routine.",jp:"習慣がない。",next:"solution"}
        ]
      },
      exercise: {
        q:"What kind of exercise feels realistic for you?",jp:"現実的にできそうな運動は何？",mood:"happy",gesture:"nod",
        choices:[
          {en:"Walking for twenty minutes.",jp:"20分歩くこと。",next:"solution"},
          {en:"Light stretching at home.",jp:"家で軽くストレッチすること。",next:"solution"},
          {en:"Going to the gym once a week.",jp:"週1回ジムに行くこと。",next:"solution"}
        ]
      },
      englishGoal: {
        q:"What would you most like to do in English?",jp:"英語で一番できるようになりたいことは何？",mood:"happy",gesture:"explain",
        choices:[
          {en:"I want to have casual conversations.",jp:"日常会話がしたい。",next:"conversationGoal",set:{englishGoal:"casual conversation"}},
          {en:"I want to travel more confidently.",jp:"旅行で自信を持って話したい。",next:"travelBridge",set:{englishGoal:"travel"}},
          {en:"I want to understand movies.",jp:"映画を理解したい。",next:"movie",set:{englishGoal:"movies"}}
        ]
      },
      solution: {
        q:"What is the smallest step you could start with tomorrow?",jp:"明日から始められる一番小さな一歩は何？",mood:"happy",gesture:"nod",
        choices:[
          {en:"I can set a reminder.",jp:"リマインダーを設定できる。",next:"wrap"},
          {en:"I can start with ten minutes.",jp:"10分から始められる。",next:"wrap"},
          {en:"I can prepare tonight.",jp:"今夜準備できる。",next:"wrap"}
        ]
      },
      memoryCheck: {
        q:"Earlier, you said you like spending time with your family. What do you value most about that time?",jp:"さっき家族と過ごすのが好きと言っていたね。その時間で一番大切なことは？",mood:"happy",gesture:"nod",
        choices:[
          {en:"We can relax together.",jp:"一緒にリラックスできること。",next:"wrap"},
          {en:"We understand each other better.",jp:"お互いをもっと理解できること。",next:"wrap"},
          {en:"It makes ordinary days feel special.",jp:"普通の日が特別に感じられること。",next:"wrap"}
        ]
      },
      career: {
        q:"How has your work changed you?",jp:"仕事を通して自分はどう変わった？",mood:"think",gesture:"explain",
        choices:[
          {en:"I became more patient.",jp:"もっと忍耐強くなった。",next:"wrap"},
          {en:"I became more confident.",jp:"もっと自信がついた。",next:"wrap"},
          {en:"I learned to communicate better.",jp:"より上手に伝えることを学んだ。",next:"communication"}
        ]
      },
      communication: {
        q:"What makes communication difficult sometimes?",jp:"コミュニケーションが難しくなるのはどんな時？",mood:"think",gesture:"shrug",
        choices:[
          {en:"People make assumptions.",jp:"人が思い込みをする時。",next:"wrap"},
          {en:"People don’t listen carefully.",jp:"人がきちんと聞かない時。",next:"wrap"},
          {en:"The message is unclear.",jp:"伝え方が曖昧な時。",next:"wrap"}
        ]
      },
      trust: {
        q:"How do you know when you can trust someone?",jp:"相手を信頼できると、どう判断する？",mood:"think",gesture:"nod",
        choices:[
          {en:"They keep their promises.",jp:"約束を守る。",next:"wrap"},
          {en:"They are honest even when it’s difficult.",jp:"難しい時でも正直。",next:"wrap"},
          {en:"Their actions match their words.",jp:"言葉と行動が一致している。",next:"wrap"}
        ]
      },
      humor: {
        q:"What kind of humor do you enjoy?",jp:"どんなユーモアが好き？",mood:"happy",gesture:"wave",
        choices:[
          {en:"I like clever jokes.",jp:"気の利いた冗談が好き。",next:"wrap"},
          {en:"I enjoy light, everyday humor.",jp:"日常の軽いユーモアが好き。",next:"wrap"},
          {en:"I like making people laugh.",jp:"人を笑わせるのが好き。",next:"wrap"}
        ]
      },
      recommend: {
        q:"What is one movie you would recommend to a friend?",jp:"友達におすすめしたい映画は何？",mood:"happy",gesture:"explain",
        choices:[
          {en:"I’d recommend a classic action movie.",jp:"定番のアクション映画をおすすめする。",next:"wrap"},
          {en:"I’d recommend a funny comedy.",jp:"面白いコメディーをおすすめする。",next:"wrap"},
          {en:"I’d recommend a moving drama.",jp:"感動するドラマをおすすめする。",next:"wrap"}
        ]
      },
      emotion: {
        q:"Do you like stories that make you emotional?",jp:"感情を動かされる物語は好き？",mood:"think",gesture:"nod",
        choices:[
          {en:"Yes, they stay with me.",jp:"うん、心に残る。",next:"wrap"},
          {en:"Sometimes, but not too often.",jp:"時々は好きだけど、頻繁には見ない。",next:"wrap"},
          {en:"I prefer lighter stories.",jp:"もっと軽い話が好き。",next:"humor"}
        ]
      },
      commute: {
        q:"How long is your usual commute?",jp:"普段の通勤時間はどれくらい？",mood:"think",gesture:"nod",
        choices:[
          {en:"About thirty minutes.",jp:"30分くらい。",next:"wrap"},
          {en:"About an hour.",jp:"1時間くらい。",next:"wrap"},
          {en:"I work close to home.",jp:"家の近くで働いている。",next:"wrap"}
        ]
      },
      foodBridge: {
        q:"What kind of food feels like a reward to you?",jp:"ご褒美に感じる食べ物は何？",mood:"happy",gesture:"wave",
        choices:[
          {en:"Sushi.",jp:"寿司。",next:"wrap",set:{favoriteFood:"sushi"}},
          {en:"Steak.",jp:"ステーキ。",next:"wrap",set:{favoriteFood:"steak"}},
          {en:"Dessert.",jp:"デザート。",next:"wrap",set:{favoriteFood:"dessert"}}
        ]
      },
      shoppingBridge: {
        q:"What kind of small things do you enjoy buying?",jp:"どんな小さなものを買うのが好き？",mood:"happy",gesture:"explain",
        choices:[
          {en:"Books.",jp:"本。",next:"wrap"},
          {en:"Coffee or snacks.",jp:"コーヒーやお菓子。",next:"wrap"},
          {en:"Something useful for home.",jp:"家で使える便利なもの。",next:"wrap"}
        ]
      },
      hobbyBridge: {
        q:"What hobby helps you forget about work?",jp:"仕事を忘れられる趣味は何？",mood:"happy",gesture:"wave",
        choices:[
          {en:"Watching movies.",jp:"映画を見ること。",next:"movie"},
          {en:"Listening to music.",jp:"音楽を聴くこと。",next:"music"},
          {en:"Going for a walk.",jp:"散歩すること。",next:"exercise"}
        ]
      },
      travelBridge: {
        q:"Where would you like to travel next?",jp:"次はどこへ旅行したい？",mood:"happy",gesture:"explain",
        choices:[
          {en:"I’d like to visit Europe.",jp:"ヨーロッパに行きたい。",next:"wrap",set:{travel:"Europe"}},
          {en:"I’d like to visit the United States.",jp:"アメリカに行きたい。",next:"wrap",set:{travel:"the United States"}},
          {en:"I’d like to travel somewhere in Asia.",jp:"アジアのどこかへ行きたい。",next:"wrap",set:{travel:"Asia"}}
        ]
      },
      conversationGoal: {
        q:"Who would you most like to speak English with?",jp:"誰と英語で一番話したい？",mood:"happy",gesture:"nod",
        choices:[
          {en:"People I meet while traveling.",jp:"旅行先で出会う人。",next:"travelBridge"},
          {en:"Friends from other countries.",jp:"外国の友達。",next:"wrap"},
          {en:"People at work.",jp:"仕事で関わる人。",next:"career"}
        ]
      },
      wrap: {
        q:"That was a good conversation. Would you like to continue with this topic or change topics?",jp:"いい会話だったね。この話題を続ける？それとも話題を変える？",mood:"happy",gesture:"wave",
        choices:[
          {en:"Let’s continue this topic.",jp:"この話題を続けよう。",next:"memoryFollow"},
          {en:"Let’s talk about something else.",jp:"別の話をしよう。",nextTopic:"rotate"},
          {en:"Let’s stop here for today.",jp:"今日はここまでにしよう。",next:"goodbye"}
        ]
      },
      memoryFollow: {
        q:"Thinking about what you said, what feels most important to you right now?",jp:"ここまで話したことを考えると、今の自分にとって一番大切なのは何？",mood:"think",gesture:"nod",
        choices:[
          {en:"Having enough time.",jp:"十分な時間があること。",next:"wrap"},
          {en:"Staying healthy.",jp:"健康でいること。",next:"wrap"},
          {en:"Spending time with people I care about.",jp:"大切な人と過ごすこと。",next:"wrap"}
        ]
      },
      goodbye: {
        q:"I enjoyed talking with you. See you next time!",jp:"話せて楽しかったよ。また次回！",mood:"happy",gesture:"wave",
        choices:[
          {en:"See you next time!",jp:"また次回！",next:"start"},
          {en:"Thanks for the conversation.",jp:"会話ありがとう。",next:"start"}
        ]
      }
    }
  },

  travel: {
    label:"Travel",
    starters:["travel","trip","hotel","airport","flight","vacation","kyoto","tokyo"],
    nodes:{
      start:{
        q:"If you could take a trip next month, where would you go?",jp:"来月旅行できるなら、どこへ行きたい？",mood:"happy",gesture:"wave",
        choices:[
          {en:"I’d go somewhere in Japan.",jp:"日本のどこかへ行く。",next:"japan"},
          {en:"I’d travel overseas.",jp:"海外旅行に行く。",next:"overseas"},
          {en:"I’d prefer a quiet weekend trip.",jp:"静かな週末旅行がいい。",next:"weekend"}
        ]
      },
      japan:{
        q:"Would you prefer a big city, the countryside, or the coast?",jp:"大都市、田舎、海辺ならどれがいい？",mood:"think",gesture:"explain",
        choices:[
          {en:"A big city.",jp:"大都市。",next:"city"},
          {en:"The countryside.",jp:"田舎。",next:"country"},
          {en:"The coast.",jp:"海辺。",next:"coast"}
        ]
      },
      overseas:{
        q:"What matters most when you choose a country to visit?",jp:"旅行先の国を選ぶ時、一番大切なのは何？",mood:"think",gesture:"nod",
        choices:[
          {en:"The food.",jp:"食べ物。",next:"food"},
          {en:"The history and culture.",jp:"歴史と文化。",next:"culture"},
          {en:"The scenery.",jp:"景色。",next:"scenery"}
        ]
      },
      weekend:{
        q:"What would make a weekend trip relaxing for you?",jp:"どんな週末旅行ならリラックスできる？",mood:"happy",gesture:"nod",
        choices:[
          {en:"A quiet hotel.",jp:"静かなホテル。",next:"hotel"},
          {en:"Good food and no schedule.",jp:"おいしい食事と予定なし。",next:"food"},
          {en:"Nature and fresh air.",jp:"自然と新鮮な空気。",next:"scenery"}
        ]
      },
      city:{
        q:"What do you enjoy doing in a big city?",jp:"大都市では何をするのが好き？",mood:"happy",gesture:"explain",
        choices:[
          {en:"Visiting museums.",jp:"美術館や博物館に行く。",next:"culture"},
          {en:"Shopping and trying restaurants.",jp:"買い物とレストラン巡り。",next:"food"},
          {en:"Walking around different neighborhoods.",jp:"いろいろな街を歩く。",next:"memory"}
        ]
      },
      country:{
        q:"Would you rather stay at a traditional inn or a small guesthouse?",jp:"旅館と小さなゲストハウスならどちらがいい？",mood:"think",gesture:"nod",
        choices:[
          {en:"A traditional inn.",jp:"旅館。",next:"hotel"},
          {en:"A small guesthouse.",jp:"小さなゲストハウス。",next:"hotel"},
          {en:"Either is fine if it’s quiet.",jp:"静かならどちらでもいい。",next:"memory"}
        ]
      },
      coast:{
        q:"What would you do first by the sea?",jp:"海辺に着いたら最初に何をする？",mood:"happy",gesture:"wave",
        choices:[
          {en:"Take a long walk.",jp:"長く散歩する。",next:"scenery"},
          {en:"Find a seafood restaurant.",jp:"海鮮レストランを探す。",next:"food"},
          {en:"Sit and watch the sunset.",jp:"座って夕日を見る。",next:"memory"}
        ]
      },
      hotel:{
        q:"What makes a hotel feel comfortable to you?",jp:"ホテルが快適だと感じる条件は何？",mood:"think",gesture:"explain",
        choices:[
          {en:"A quiet room.",jp:"静かな部屋。",next:"memory"},
          {en:"Friendly staff.",jp:"親切なスタッフ。",next:"service"},
          {en:"A good breakfast.",jp:"おいしい朝食。",next:"food"}
        ]
      },
      food:{
        q:"What local food would you be excited to try?",jp:"どんな現地料理を食べてみたい？",mood:"happy",gesture:"wave",
        choices:[
          {en:"Something traditional.",jp:"伝統料理。",next:"memory"},
          {en:"Street food.",jp:"屋台料理。",next:"memory"},
          {en:"A famous dessert.",jp:"有名なデザート。",next:"memory"}
        ]
      },
      culture:{
        q:"Do you prefer learning history before a trip or discovering it while you’re there?",jp:"旅行前に歴史を学ぶ？それとも現地で知る方が好き？",mood:"think",gesture:"nod",
        choices:[
          {en:"I like preparing before the trip.",jp:"旅行前に準備するのが好き。",next:"planning"},
          {en:"I prefer discovering things there.",jp:"現地で発見する方が好き。",next:"memory"},
          {en:"A little of both.",jp:"両方少しずつ。",next:"planning"}
        ]
      },
      scenery:{
        q:"What kind of scenery helps you relax most?",jp:"どんな景色が一番リラックスできる？",mood:"happy",gesture:"nod",
        choices:[
          {en:"Mountains.",jp:"山。",next:"memory"},
          {en:"The ocean.",jp:"海。",next:"memory"},
          {en:"Old streets and buildings.",jp:"古い街並みや建物。",next:"culture"}
        ]
      },
      planning:{
        q:"Are you the kind of traveler who plans everything?",jp:"旅行は全部計画するタイプ？",mood:"think",gesture:"shrug",
        choices:[
          {en:"Yes, I like detailed plans.",jp:"うん、細かく計画したい。",next:"memory"},
          {en:"No, I like being spontaneous.",jp:"いいえ、気ままに動きたい。",next:"memory"},
          {en:"I plan the important things only.",jp:"大事なことだけ計画する。",next:"memory"}
        ]
      },
      service:{
        q:"Have you ever had especially good service while traveling?",jp:"旅行中に特に良いサービスを受けたことはある？",mood:"happy",gesture:"explain",
        choices:[
          {en:"Yes, the staff were very helpful.",jp:"うん、スタッフがとても親切だった。",next:"memory"},
          {en:"Not really.",jp:"特にはない。",next:"memory"},
          {en:"I remember one kind taxi driver.",jp:"親切なタクシー運転手を覚えている。",next:"memory"}
        ]
      },
      memory:{
        q:"What kind of travel memory stays with you for a long time?",jp:"どんな旅行の思い出が長く心に残る？",mood:"think",gesture:"nod",
        choices:[
          {en:"A beautiful place.",jp:"美しい場所。",next:"wrap"},
          {en:"A meaningful conversation.",jp:"心に残る会話。",next:"wrap"},
          {en:"An unexpected experience.",jp:"予想外の体験。",next:"wrap"}
        ]
      },
      wrap:{
        q:"Would you like to keep planning this imaginary trip or change topics?",jp:"この架空の旅行計画を続ける？それとも話題を変える？",mood:"happy",gesture:"wave",
        choices:[
          {en:"Let’s keep planning.",jp:"計画を続けよう。",next:"start"},
          {en:"Let’s change topics.",jp:"話題を変えよう。",nextTopic:"rotate"},
          {en:"Let’s stop here.",jp:"ここで終わろう。",next:"goodbye"}
        ]
      },
      goodbye:{
        q:"That was fun. I hope you get to take that trip someday!",jp:"楽しかったね。いつかその旅行に行けるといいね！",mood:"happy",gesture:"wave",
        choices:[
          {en:"Me too. See you next time!",jp:"私もそう思う。また次回！",next:"start"}
        ]
      }
    }
  }
};

const CHARACTER = {
  mike:{
    name:"Mike",
    color:"#1f3658",
    hair:"#2e2423",
    longHair:"",
    acknowledgements:{
      happy:["That sounds great.","Nice! I like that.","Good choice."],
      sad:["That sounds difficult.","I’m sorry—it sounds tiring.","I understand. That can be hard."],
      neutral:["I see.","That makes sense.","Interesting."]
    }
  },
  sophie:{
    name:"Sophie",
    color:"#8e5578",
    hair:"#4a302c",
    longHair:"M145 205 Q105 275 120 410 Q140 470 180 490 Q155 375 178 210Z M375 205 Q415 275 400 410 Q380 470 340 490 Q365 375 342 210Z",
    acknowledgements:{
      happy:["That sounds lovely.","I’m glad to hear that.","That’s really nice."],
      sad:["Oh, that sounds exhausting.","I’m sorry you had to deal with that.","That must have been difficult."],
      neutral:["I understand.","That’s interesting.","Tell me more."]
    }
  }
};

let character = localStorage.getItem("eel06-character") || "mike";
let topicKey = localStorage.getItem("eel06-topic") || "daily";
let nodeKey = "start";
let memory = JSON.parse(localStorage.getItem("eel06-memory") || "{}");
let voices = [];
let topicOrder = ["daily","travel"];

const avatar = document.querySelector("#avatar");
const history = document.querySelector("#history");
const choices = document.querySelector("#choices");
const statusEl = document.querySelector("#status");
const input = document.querySelector("#input");

function saveState(){
  localStorage.setItem("eel06-character",character);
  localStorage.setItem("eel06-topic",topicKey);
  localStorage.setItem("eel06-memory",JSON.stringify(memory));
}

function esc(s){
  return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}

function person(){ return CHARACTER[character]; }
function node(){ return TOPICS[topicKey].nodes[nodeKey]; }

function applyCharacter(){
  const p=person();
  document.querySelector("#nameLabel").textContent=p.name;
  document.querySelector("#speaker").textContent=p.name;
  document.querySelector("#torso").setAttribute("fill",p.color);
  document.querySelector("#hairBack").setAttribute("fill",p.hair);
  document.querySelector("#hairFront").setAttribute("fill",p.hair);
  document.querySelector("#longHair").setAttribute("fill",p.hair);
  document.querySelector("#longHair").setAttribute("d",p.longHair);
  document.querySelector("#switchBtn").textContent=character==="mike"?"Sophieに変更":"Mikeに変更";
}

function setState(mood="idle",gesture=""){
  const classes=["idle"];
  if(mood==="happy")classes.push("happy");
  if(mood==="sad")classes.push("sad");
  if(mood==="think")classes.push("think");
  if(mood==="surprised")classes.push("surprised");
  if(gesture)classes.push(gesture);
  avatar.setAttribute("class",classes.join(" "));
  document.querySelector("#moodLabel").textContent=
    mood==="happy"?"笑顔":
    mood==="sad"?"共感しています":
    mood==="think"?"考えています":
    mood==="surprised"?"驚いています":"聞いています";
}

function refreshVoices(){
  voices=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang));
}
if("speechSynthesis" in window){
  refreshVoices();
  speechSynthesis.onvoiceschanged=refreshVoices;
}

function chooseVoice(){
  const hints=character==="mike"
    ?["Daniel","Alex","Arthur","Oliver","Tom"]
    :["Samantha","Ava","Karen","Moira","Tessa"];
  for(const h of hints){
    const v=voices.find(x=>x.name.includes(h));
    if(v)return v;
  }
  return voices[character==="mike"?0:Math.max(voices.length-1,0)]||null;
}

function speak(text,mood="happy",gesture=""){
  if(!("speechSynthesis" in window))return;
  speechSynthesis.cancel();
  avatar.setAttribute("class",`talk ${gesture}`.trim());
  document.querySelector("#moodLabel").textContent="話しています";
  const u=new SpeechSynthesisUtterance(text);
  u.lang="en-US";
  u.rate=character==="mike"?.88:.94;
  u.pitch=character==="mike"?.92:1.05;
  const v=chooseVoice(); if(v)u.voice=v;
  u.onend=()=>setState(mood,"");
  speechSynthesis.speak(u);
}

function addMessage(type,en,jp=""){
  const d=document.createElement("div");
  d.className=`msg ${type}`;
  d.innerHTML=`<b>${esc(en)}</b>${jp?`<small>${esc(jp)}</small>`:""}`;
  history.appendChild(d);
  history.scrollTop=history.scrollHeight;
}

function randomAck(mood){
  const arr=person().acknowledgements[mood]||person().acknowledgements.neutral;
  return arr[Math.floor(Math.random()*arr.length)];
}

function renderNode(announce=true){
  const n=node();
  document.querySelector("#qEn").textContent=n.q;
  document.querySelector("#qJp").textContent=n.jp;
  document.querySelector("#topicLabel").textContent=TOPICS[topicKey].label;
  document.querySelector("#speaker").textContent=person().name;

  choices.innerHTML="";
  n.choices.forEach(c=>{
    const b=document.createElement("button");
    b.innerHTML=`${esc(c.en)}<small>${esc(c.jp)}</small>`;
    b.onclick=()=>handleChoice(c);
    choices.appendChild(b);
  });

  setState(n.mood,n.gesture);
  if(announce){
    addMessage("friend",n.q,n.jp);
    speak(n.q,n.mood,n.gesture);
  }
}

function setMemory(obj){
  if(!obj)return;
  Object.assign(memory,obj);
  saveState();
}

function rotateTopic(){
  const idx=topicOrder.indexOf(topicKey);
  topicKey=topicOrder[(idx+1)%topicOrder.length];
  nodeKey="start";
  saveState();
}

function handleChoice(c){
  addMessage("user",c.en,c.jp);
  setMemory(c.set);
  choices.innerHTML="";
  setState("think","");
  statusEl.textContent=`${person().name}が考えています…`;

  const mood = /great|good|like|enjoy|happy|relax|nice|love/i.test(c.en)
    ?"happy"
    : /tired|difficult|hard|nervous|stress|too long/i.test(c.en)
    ?"sad":"neutral";

  setTimeout(()=>{
    const ack=randomAck(mood);
    addMessage("friend",ack,"");
    speak(ack,mood,mood==="happy"?"nod":"");

    setTimeout(()=>{
      if(c.nextTopic==="rotate"){
        rotateTopic();
      }else{
        nodeKey=c.next||"start";
      }
      saveState();
      renderNode(true);
      statusEl.textContent="回答例を選ぶか、英語で入力してください。";
    },500);
  },450);
}

function classifyFreeText(text){
  const t=text.toLowerCase();

  const topicMatch=Object.entries(TOPICS).find(([k,v])=>v.starters.some(w=>t.includes(w)));
  if(topicMatch && topicMatch[0]!==topicKey){
    topicKey=topicMatch[0];
    nodeKey="start";
    return {reply:`That sounds like a ${TOPICS[topicKey].label.toLowerCase()} topic. Let’s talk about that.`,mood:"happy",switchTopic:true};
  }

  if(/\b(daughter|son|wife|husband|family)\b/.test(t)){
    memory.familyMention=text;
    return {reply:"You mentioned your family. I’ll remember that. What do you enjoy doing together?",mood:"happy",nextNode:"family"};
  }
  if(/\b(movie|film|cinema)\b/.test(t)){
    memory.movieMention=text;
    return {reply:"Movies are a great topic. What kind of movies do you enjoy?",mood:"happy",nextNode:"movie"};
  }
  if(/\b(tired|exhausted|stress|stressed)\b/.test(t)){
    return {reply:"You sound tired. What usually helps you relax after a difficult day?",mood:"sad",nextNode:"stress"};
  }
  if(/\b(meeting|report|project|office|work)\b/.test(t)){
    memory.workMention=text;
    return {reply:"I see. What part of your work took the most energy today?",mood:"think",nextNode:"busy"};
  }
  if(/\b(travel|trip|hotel|airport|vacation)\b/.test(t)){
    topicKey="travel"; nodeKey="start";
    return {reply:"Travel sounds like a good topic. Let’s explore that.",mood:"happy",switchTopic:true};
  }
  if(/\b(good|great|happy|wonderful|fun)\b/.test(t)){
    return {reply:"That’s good to hear. What made it feel positive?",mood:"happy",nextNode:"positiveWork"};
  }
  if(/\b(bad|awful|sad|difficult|hard)\b/.test(t)){
    return {reply:"I’m sorry to hear that. What was the hardest part?",mood:"sad",nextNode:"stress"};
  }

  return {
    reply:"I understand part of what you said, but this offline version works best with the suggested answers. Could you choose the closest answer below?",
    mood:"think",
    keepNode:true
  };
}

function handleFreeText(text){
  if(!text.trim())return;
  addMessage("user",text.trim(),"");
  input.value="";
  choices.innerHTML="";
  setState("think","");
  statusEl.textContent=`${person().name}が考えています…`;

  setTimeout(()=>{
    const r=classifyFreeText(text);
    addMessage("friend",r.reply,"");
    speak(r.reply,r.mood,r.mood==="happy"?"nod":"");

    setTimeout(()=>{
      if(r.nextNode && TOPICS[topicKey].nodes[r.nextNode])nodeKey=r.nextNode;
      if(r.switchTopic)nodeKey="start";
      saveState();
      renderNode(false);
      statusEl.textContent="回答例を選ぶか、英語で入力してください。";
    },600);
  },500);
}

document.querySelector("#form").onsubmit=e=>{
  e.preventDefault();
  handleFreeText(input.value);
};

document.querySelector("#switchBtn").onclick=()=>{
  character=character==="mike"?"sophie":"mike";
  saveState();
  history.innerHTML="";
  nodeKey="start";
  applyCharacter();
  renderNode(true);
};

document.querySelector("#memoryBtn").onclick=()=>{
  const dialog=document.querySelector("#memoryDialog");
  const content=document.querySelector("#memoryContent");
  const entries=Object.entries(memory);
  content.innerHTML=entries.length
    ?`<dl class="memory-grid">${entries.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>`
    :"<p>まだ保存された情報はありません。</p>";
  dialog.showModal();
};
document.querySelector("#closeMemory").onclick=()=>document.querySelector("#memoryDialog").close();
document.querySelector("#clearMemory").onclick=()=>{
  memory={};saveState();
  document.querySelector("#memoryContent").innerHTML="<p>記憶を消去しました。</p>";
};

const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
if(SpeechRecognition){
  const rec=new SpeechRecognition();
  rec.lang="en-US";rec.interimResults=false;
  document.querySelector("#micBtn").onclick=()=>{
    try{rec.start();statusEl.textContent="英語で話してください…";}catch{}
  };
  rec.onresult=e=>handleFreeText(e.results[0][0].transcript);
  rec.onerror=()=>statusEl.textContent="音声入力に失敗しました。文字入力を使えます。";
}else{
  document.querySelector("#micBtn").onclick=()=>statusEl.textContent="このブラウザでは音声入力を利用できません。";
}

function blinkLoop(){
  setTimeout(()=>{
    avatar.classList.add("blink");
    setTimeout(()=>avatar.classList.remove("blink"),150);
    blinkLoop();
  },2600+Math.random()*4200);
}

if("serviceWorker" in navigator){
  navigator.serviceWorker.getRegistrations()
    .then(rs=>Promise.all(rs.map(r=>r.unregister())))
    .then(()=>navigator.serviceWorker.register("./sw.js?v=060"));
}

applyCharacter();
renderNode(true);
blinkLoop();

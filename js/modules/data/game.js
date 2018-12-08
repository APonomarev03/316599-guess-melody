export const INITIAL_STATE = {
  level: 0,
  notes: 3,
  scores: 0,
  answers: {
    slow: 0,
    fast: 0,
  },
  time: {
    minutes: 4,
    seconds: 59
  }
};

export const PLAYERS_STATISTICS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export let PLAYER_ANSWERS = [];

export const QUESTIONS = {
  'screen-1': {
    text: `Кто исполняет эту песню?`,
    type: `artist`,
    answers: [
      {
        isCorrect: true,
        time: 35,
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Audionautix`,
        name: `Travel Light`,
        image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      },
    ],
  },
  'screen-2': {
    text: `Выберите инди-рок треки`,
    type: `genre`,
    answers: [
      {
        isCorrect: false,
        time: 35,
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        isCorrect: true,
        time: 35,
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Audionautix`,
        name: `Travel Light`,
        image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      },
      {
        isCorrect: false,
        artist: `Riot`,
        name: `	Level Plane`,
        image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
        genre: `R&B`
      },
    ],
  },
  'screen-3': {
    text: `Кто исполняет эту песню?`,
    type: `artist`,
    answers: [
      {
        isCorrect: true,
        time: 35,
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Audionautix`,
        name: `Travel Light`,
        image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      },
    ],
  },
  'screen-4': {
    text: `Выберите инди-рок треки`,
    type: `genre`,
    answers: [
      {
        isCorrect: false,
        time: 35,
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        isCorrect: true,
        time: 35,
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Audionautix`,
        name: `Travel Light`,
        image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      },
      {
        isCorrect: false,
        artist: `Riot`,
        name: `	Level Plane`,
        image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
        genre: `R&B`
      },
    ],
  },
  'screen-5': {
    text: `Кто исполняет эту песню?`,
    type: `artist`,
    answers: [
      {
        isCorrect: true,
        time: 35,
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Audionautix`,
        name: `Travel Light`,
        image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      },
    ],
  },
  'screen-6': {
    text: `Выберите инди-рок треки`,
    type: `genre`,
    answers: [
      {
        isCorrect: false,
        time: 35,
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        isCorrect: true,
        time: 35,
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Audionautix`,
        name: `Travel Light`,
        image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      },
      {
        isCorrect: false,
        artist: `Riot`,
        name: `	Level Plane`,
        image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
        genre: `R&B`
      },
    ],
  },
  'screen-7': {
    text: `Кто исполняет эту песню?`,
    type: `artist`,
    answers: [
      {
        isCorrect: true,
        time: 35,
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Audionautix`,
        name: `Travel Light`,
        image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      },
    ],
  },
  'screen-8': {
    text: `Выберите инди-рок треки`,
    type: `genre`,
    answers: [
      {
        isCorrect: false,
        time: 35,
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        isCorrect: true,
        time: 35,
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Audionautix`,
        name: `Travel Light`,
        image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      },
      {
        isCorrect: false,
        artist: `Riot`,
        name: `	Level Plane`,
        image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
        genre: `R&B`
      },
    ],
  },
  'screen-9': {
    text: `Кто исполняет эту песню?`,
    type: `artist`,
    possibleAnswers: [`Kevin MacLeod`, `Jingle Punks`, `Audionautix`, `Jingle Punks`],
    answers: [
      {
        isCorrect: true,
        time: 35,
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Audionautix`,
        name: `Travel Light`,
        image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      },
    ],
  },
  'screen-10': {
    text: `Выберите инди-рок треки`,
    type: `genre`,
    answers: [
      {
        isCorrect: false,
        time: 35,
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`
      },
      {
        isCorrect: true,
        time: 35,
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        isCorrect: false,
        time: 35,
        artist: `Audionautix`,
        name: `Travel Light`,
        image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Country`
      },
      {
        isCorrect: false,
        artist: `Riot`,
        name: `	Level Plane`,
        image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
        genre: `R&B`
      },
    ],
  }
};

export const playerAnswers = [];

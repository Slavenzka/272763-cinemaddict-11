import AbstractSmartComponent from './abstract-smart-component';
import {filmsModel, userRank} from '../main';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {DIAGRAM_BAR_HEIGHT, StatsFilterTypes} from '../const';
import moment from 'moment';

const getFilteredData = (data, filterType) => {
  let filteredData;

  switch (filterType) {
    case StatsFilterTypes.TODAY:
      filteredData = data.filter((film) => {
        const differenceInDays = moment().diff(film[`user_details`][`watching_date`], `days`);
        return film[`user_details`][`already_watched`] && differenceInDays < 1;
      });
      break;
    case StatsFilterTypes.WEEK:
      filteredData = data.filter((film) => {
        const differenceInWeeks = moment().diff(film[`user_details`][`watching_date`], `week`);
        return film[`user_details`][`already_watched`] && differenceInWeeks < 1;
      });
      break;
    case StatsFilterTypes.MONTH:
      filteredData = data.filter((film) => {
        const differenceInMonths = moment().diff(film[`user_details`][`watching_date`], `month`);
        return film[`user_details`][`already_watched`] && differenceInMonths < 1;
      });
      break;
    case StatsFilterTypes.YEAR:
      filteredData = data.filter((film) => {
        const differenceInYears = moment().diff(film[`user_details`][`watching_date`], `years`);
        return film[`user_details`][`already_watched`] && differenceInYears < 1;
      });
      break;
    default:
      filteredData = data.filter((film) => film[`user_details`][`already_watched`]);
      break;
  }

  return filteredData;
};

const renderDiagram = (data) => {
  const statisticCtx = document.querySelector(`.statistic__chart`);

  statisticCtx.height = DIAGRAM_BAR_HEIGHT * Object.keys(data).length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatsItemTemplate = (activeFilterType, isChecked) => {
  const filterTypeArray = activeFilterType.split(`-`);
  filterTypeArray[0] = filterTypeArray[0][0].toUpperCase() + filterTypeArray[0].slice(1);
  const label = filterTypeArray.join(` `);

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${activeFilterType}" value="${activeFilterType}" ${isChecked ? `checked` : ``}>
    <label for="statistic-${activeFilterType}" class="statistic__filters-label">${label}</label>`
  );
};

const createStatsTemplate = (actualUserRank, activeFilterType, data) => {
  const inputList = (Object.values(StatsFilterTypes)).map((item) => createStatsItemTemplate(item, item === activeFilterType)).join(`\n`);
  const watchedMoviesQuantity = data.filtered.length;
  const totalMoviesDuration = data.filtered.reduce((total, item) => {
    total += item[`film_info`].runtime;
    return total;
  }, 0);
  const hours = moment.duration(totalMoviesDuration, `minutes`).get(`hours`);
  const minutes = moment.duration(totalMoviesDuration, `minutes`).get(`minutes`);

  const genresArraySorted = Object.keys(data.genres).sort((key1, key2) => data.genres[key1] < data.genres[key2]);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${actualUserRank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        ${inputList}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedMoviesQuantity} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${genresArraySorted[0] || ``}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Stats extends AbstractSmartComponent {
  constructor() {
    super();
    this._filmsData = filmsModel.getFilms();
    this._actualData = {};
    this._activeFilterType = StatsFilterTypes.ALL;

    this._handleClickItem = this._handleClickItem.bind(this);
    this._getUpdatedData = this._getUpdatedData.bind(this);
    this._getUpdatedData();
  }

  getTemplate() {
    return createStatsTemplate(userRank.userRank, this._activeFilterType, this._actualData);
  }

  show() {
    this._getUpdatedData();
    this._addItemClickListeners();
    super.show();
    this.rerender();
  }

  _addItemClickListeners() {
    const inputList = [...this.getElement().querySelectorAll(`.statistic__filters-input`)];
    inputList.forEach((item) => {
      item.addEventListener(`change`, this._handleClickItem);
    });
  }

  _handleClickItem(evt) {
    this._activeFilterType = evt.target.value;
    this.rerender();
  }

  _getUpdatedData() {
    this._actualData.filtered = [...getFilteredData(this._filmsData, this._activeFilterType)];

    const genresCount = {};
    this._actualData.filtered.forEach((film) => {
      film[`film_info`][`genre`].forEach((genre) => {
        genresCount[genre] = genresCount[genre] ? genresCount[genre] + 1 : 1;
      });
    });

    this._actualData.genres = genresCount;
  }

  rerender() {
    this._getUpdatedData();
    super.rerender();
    renderDiagram(this._actualData.genres);
  }

  recoverListeners() {
    this._addItemClickListeners();
  }
}

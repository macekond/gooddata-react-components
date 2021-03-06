// (C) 2007-2018 GoodData Corporation
import pick = require('lodash/pick');
import set = require('lodash/set');
import { RIGHT } from './PositionTypes';
import {
    isAreaChart,
    isScatterPlot,
    isOneOfTypes
} from '../../utils/common';
import { VisualizationTypes } from '../../../../constants/visualizationTypes';

export const DEFAULT_LEGEND_CONFIG = {
    enabled: true,
    position: RIGHT
};

export function shouldLegendBeEnabled(chartOptions: any) {
    const seriesLength = chartOptions.data.series.length;
    const { type, stacking, hasStackByAttribute } = chartOptions;
    // More than one measure or stackedBy more than one category
    const hasMoreThanOneSeries = seriesLength > 1;
    const isAreaChartWithOneSerie = isAreaChart(type) && !hasMoreThanOneSeries && !hasStackByAttribute;
    const isStacked = !isAreaChartWithOneSerie && Boolean(stacking);

    const sliceTypes = [VisualizationTypes.PIE, VisualizationTypes.DONUT, VisualizationTypes.TREEMAP];
    const isSliceChartWithMoreThanOneCategory = isOneOfTypes(type, sliceTypes) &&
        chartOptions.data.series[0].data.length > 1;

    const isScatterPlotWithAttribute = isScatterPlot(type) && chartOptions.data.series[0].name;

    return hasMoreThanOneSeries || isSliceChartWithMoreThanOneCategory || isStacked || isScatterPlotWithAttribute;
}

export function getLegendItems(chartOptions: any) {
    const { type } = chartOptions;
    const firstSeriesDataTypes = [
        VisualizationTypes.PIE,
        VisualizationTypes.DONUT,
        VisualizationTypes.TREEMAP,
        VisualizationTypes.FUNNEL,
        VisualizationTypes.SCATTER
    ];
    const legendDataSource = isOneOfTypes(type, firstSeriesDataTypes)
        ? chartOptions.data.series[0].data
        : chartOptions.data.series;

    return legendDataSource.map((legendDataSourceItem: any) =>
        pick(legendDataSourceItem, ['name', 'color', 'legendIndex']));
}

export default function getLegend(legendConfig: any = {}, chartOptions: any) {
    const rightLegendCharts = [VisualizationTypes.SCATTER, VisualizationTypes.TREEMAP, VisualizationTypes.BUBBLE];

    if (isOneOfTypes(chartOptions.type, rightLegendCharts)) {
        set(legendConfig, 'position', 'right');
    }

    const baseConfig = {
        ...DEFAULT_LEGEND_CONFIG,
        ...legendConfig
    };

    return {
        ...baseConfig,
        enabled: baseConfig.enabled && shouldLegendBeEnabled(chartOptions),
        items: getLegendItems(chartOptions)
    };
}

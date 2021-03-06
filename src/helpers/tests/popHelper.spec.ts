// (C) 2007-2018 GoodData Corporation
import { fillPoPTitlesAndAliases } from '../popHelper';
import { visualizationObjects } from '../../../__mocks__/fixtures';

describe('fillPoPTitlesAndAliases', () => {
    it('should add missing title and alias for PoP measure', () => {
        const visContentWithPoP = visualizationObjects.find(chart =>
            chart.visualizationObject.meta.title === 'PoP'
        ).visualizationObject.content;
        expect(fillPoPTitlesAndAliases(visContentWithPoP, ' - testing pop title').buckets[0].items).toEqual(
            [
                {
                    measure: {
                        localIdentifier: 'm1',
                        title: '# Accounts with AD Query',
                        definition: {
                            measureDefinition: {
                                item: {
                                    uri: '/gdc/md/myproject/obj/8172'
                                }
                            }
                        }
                    }
                },
                {
                    measure: {
                        localIdentifier: 'm1_pop',
                        title: '# Accounts with AD Query - testing pop title',
                        definition: {
                            popMeasureDefinition: {
                                measureIdentifier: 'm1',
                                popAttribute: {
                                    uri: '/gdc/md/myproject/obj/1514'
                                }
                            }
                        }
                    }
                }
            ]
        );
    });

    it('should add title and alias to pop measure in different bucket', () => {
        const headlineWithPoP = visualizationObjects.find(visualizationObject =>
            visualizationObject.visualizationObject.meta.title === 'pop headline test'
        ).visualizationObject.content;

        const updatedVisualizationObjectContent = fillPoPTitlesAndAliases(headlineWithPoP, ' - testing pop title');
        expect(updatedVisualizationObjectContent.buckets[0].items).toEqual(
            [
                {
                    measure: {
                        localIdentifier: 'fdd41e4ca6224cd2b5ecce15fdabf062',
                        title: 'Sum of Email Clicks',
                        format: '#,##0.00',
                        definition: {
                            measureDefinition: {
                                aggregation: 'sum',
                                item: {
                                    uri: '/gdc/md/yrungi0zwpoud7h1kmh6ldhp0vgkpi41/obj/15428'
                                }
                            }
                        }
                    }
                }
            ]
        );
        expect(updatedVisualizationObjectContent.buckets[1].items).toEqual(
            [
                {
                    measure: {
                        localIdentifier: 'fdd41e4ca6224cd2b5ecce15fdabf062_pop',
                        title: 'Sum of Email Clicks - testing pop title',
                        definition: {
                            popMeasureDefinition: {
                                measureIdentifier: 'fdd41e4ca6224cd2b5ecce15fdabf062',
                                popAttribute: {
                                    uri: '/gdc/md/yrungi0zwpoud7h1kmh6ldhp0vgkpi41/obj/15330'
                                }
                            }
                        }
                    }
                }
            ]
        );
    });
});

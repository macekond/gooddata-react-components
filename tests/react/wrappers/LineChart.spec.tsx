import * as React from 'react';
import { shallow } from 'enzyme';

import { IAfm } from '../../../src/interfaces/Afm';
import { LineChart } from '../../../src/react/wrappers/LineChart';
import { BaseChart } from '../../../src/react/wrappers/BaseChart';

describe('LineChart', () => {
    function createComponent(props) {
        return shallow(<LineChart {...props} />);
    }

    it('should render line chart', () => {
        const afm: IAfm = {
            measures: [
                {
                    id: '1',
                    definition: {
                        baseObject: {
                            id: '/gd/md/m1'
                        }
                    }
                }
            ]
        };
        const wrapper = createComponent({
            projectId: 'myprojectid',
            afm
        });

        expect(wrapper.find(BaseChart).length).toBe(1);
    });
});

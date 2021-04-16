import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    screen,
    waitFor,
} from '@testing-library/react';
import axiosMock from 'axios';
import Container from './Container';

const servers = [
    {
        id: 1,
        name: ' US East (Virginia)',
        status: 'ONLINE',
    },
    {
        id: 2,
        name: ' US East (Ohio)',
        status: 'ONLINE',
    },
    {
        id: 3,
        name: 'US West (N. California)',
        status: 'OFFLINE',
    },
    {
        id: 4,
        name: ' US West (Oregon)',
        status: 'ONLINE',
    },
    {
        id: 5,
        name: ' Asia Pacific (Mumbai)',
        status: 'ONLINE',
    },
    {
        id: 6,
        name: 'Asia Pacific (Osaka-Local)',
        status: 'ONLINE',
    },
    {
        id: 7,
        name: ' Asia Pacific (Seoul)',
        status: 'OFFLINE',
    },
    {
        id: 8,
        name: 'Asia Pacific (Singapore)',
        status: 'OFFLINE',
    },
    {
        id: 9,
        name: ' Asia Pacific (Sydney)',
        status: 'ONLINE',
    },
    {
        id: 10,
        name: ' Asia Pacific (Tokyo)',
        status: 'ONLINE',
    },
    {
        id: 11,
        name: 'Canada (Central)',
        status: 'ONLINE',
    },
    {
        id: 12,
        name: ' EU (Frankfurt)',
        status: 'ONLINE',
    },
    {
        id: 13,
        name: ' EU (Ireland)',
        status: 'ONLINE',
    },
    {
        id: 14,
        name: ' EU (London)',
        status: 'ONLINE',
    },
    {
        id: 15,
        name: 'EU (Paris)',
        status: 'ONLINE',
    },
    {
        id: 16,
        name: 'South America (Sao Paulo)',
        status: 'ONLINE',
    },
];

afterEach(cleanup);

describe('Container', () => {
    it('renders without crushing', () => {
        render(<Container />);
    });

    it('Rebooting functionality', async () => {
        axiosMock.get.mockResolvedValueOnce({ data: servers });

        const { getByText, getAllByTitle, getByTitle } = render(<Container />);
        expect(getByText('Loading...')).toBeTruthy();

        const infoButton = await waitFor(() => {
            getAllByTitle('infoButton');
        });
        fireEvent.click(infoButton[0]);
        const rebootButton = await waitFor(() => {
            getByTitle('rebootButton');
        })
        fireEvent.click(rebootButton);

        const statusButton = waitFor(() => {
            getAllByTitle("statusButton");
        })
        expect(statusButton[0]).toBe("REBOOTING...");

        setTimeout(() => {
            const newStatusButton = waitFor(() => {
                getAllByTitle("statusButton");
            })
            expect(newStatusButton[0]).toBe("ONLINE");
        }, 5000)
    });
});

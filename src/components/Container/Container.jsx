import React, { useState, useEffect } from 'react';
import './Container.scss';
import axios from '../../api/axios-instance'

import Table from './Table/Table';

const Container = () => {
    const [servers, setServers] = useState();
    const [filter, setFilter] = useState('');

    useEffect(() => {
        getServers('/servers');
    }, []);

    const getServers = async (url) => {
        const res = await axios.get(url);
            console.log(res.data);
            setServers(res.data);
  
    };

    const updateServers = (id, res) => {
        const newServersArray = [...servers];
        const serverIndex = newServersArray.findIndex(
            (server) => server.id === id
        );
        newServersArray[serverIndex] = res.data;
        setServers(newServersArray);
    };

    //action = [on/off]
    const handleTurnOnOffClick = (id, action) => {
        let rebooted = false;
        axios
            .put(`/servers/${id}/${action}`)
            .then((res) => {
                updateServers(id, res);
            })
            .then(() => {
                if (action === 'reboot') {
                    !rebooted &&
                        setInterval(() => {
                            axios.get(`/servers/${id}`).then((res) => {
                                if (
                                    res.data.status === 'OFFLINE' ||
                                    res.data.status === 'ONLINE'
                                ) {
                                    rebooted = true;
                                    updateServers(id, res);
                                }
                            });
                        }, 1000);
                }
            });
    };

    let filteredServers = servers
    ? servers.filter((server) => {
          let match = false;
          let serverValues = Object.values(server);
          serverValues.forEach((element) => {
              if (typeof element === 'string') {
                  if (element.toLowerCase().includes(filter.toLowerCase()))
                      match = true;
              }
          });
          return match;
      })
    : [];


    if(!servers ){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <div className='container'>
            <div className='tableHeader'>
                <div className='serversInfo'>
                    <h3 className="serverHeader">Servers</h3>
                    <p className="numberOfElements">Number of elements: {servers && servers.length}</p>
                </div>
                <div className="inputWrapper">
                    <i className="fas fa-search"></i>
                    <input
                        className="input"
                        type='text'
                        placeholder='Search'
                        aria-label='Search'
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>
            <Table
                servers={filteredServers}
                handleTurnOnOffClick={handleTurnOnOffClick}
            />
        </div>
    );
};

export default Container;

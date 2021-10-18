import React, { useState } from 'react';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Collapse,
} from '@material-ui/core';

const CollapseCheckbox = props => {
    const [open, setOpen] = useState(props.initialState);
    const [checked, setChecked] = useState([]);

    const handleCollapse = () => {
        setOpen(!open);
    };

    const handleToggle = id => {
        const currentIdx = checked.indexOf(id);
        const newChecked = [...checked];

        if (currentIdx === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIdx, 1);
        }

        setChecked(newChecked);
        props.handleFilters(newChecked);
    };

    const renderList = () =>
        props.list
            ? props.list.map(value => (
                  <ListItem key={value._id}>
                      <ListItemText primary={value.name} />
                      <ListItemSecondaryAction>
                          <Checkbox
                              color='primary'
                              onChange={() => handleToggle(value._id)}
                              checked={checked.indexOf(value._id) !== -1}
                          />
                      </ListItemSecondaryAction>
                  </ListItem>
              ))
            : null;

    return (
        <div className='collapse_items_wrapper'>
            <List>
                <ListItem onClick={handleCollapse}>
                    <ListItemText
                        primary={props.title}
                        className='collapse_title'
                    />
                    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </ListItem>
                <Collapse in={open} timeout='auto'>
                    <List component='div' disablePadding>
                        {renderList()}
                    </List>
                </Collapse>
            </List>
        </div>
    );
};

export default CollapseCheckbox;

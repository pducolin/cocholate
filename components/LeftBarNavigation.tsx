import React from 'react';
import './styles/LeftBarNavigation.css'
import { ObservableNavigationItems, NavigationItem } from './NavigationItems';
import { observer } from 'mobx-react';
import { FlourIcon } from '../icons/Icons';

interface LeftBarNavigationProps {
    observableItems: ObservableNavigationItems
    handleNavigationItemSelected?: (navItemTitle: string) => void
}

@observer
export class LeftBarNavigation extends React.Component<LeftBarNavigationProps> {
    constructor(props: LeftBarNavigationProps) {
        super(props)
        this.handleNavigationItemSelected = this.handleNavigationItemSelected.bind(this)
    }

    handleNavigationItemSelected(navItemTitle: string) {
        // update UI
        // deselect all
        this.props.observableItems.items.forEach((item) => item.isSelected = item.title == navItemTitle)

        this.props.handleNavigationItemSelected && 
        this.props.handleNavigationItemSelected(navItemTitle)
    }

    render() {
        const items = this.props.observableItems.items
        return (
            <div className='navigation-root'>
                {
                    items.map((item) => (
                        <NavigationItemView key={item.title} 
                                            navItem={item}
                                            onClick={this.handleNavigationItemSelected}/>
                    ))
                }
            </div>
        )
    }
}

interface NavigationItemViewProps {
    navItem: NavigationItem
    onClick?: (navItemTitle: string) => void
}

@observer
class NavigationItemView extends React.Component<NavigationItemViewProps> {
    constructor(props: NavigationItemViewProps) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }
    
    onClick() {
        this.props.onClick && this.props.onClick(this.props.navItem.title)
    }

    render () {
        const navItem = this.props.navItem
        const suffix = navItem.isSelected ? '-selected' : ''
        return (
            <a className={`navitem-root${suffix}`} onClick={this.onClick}>
                {
                    navItem.iconSvgPath && 
                    <div className="navitem-icon">
                        {navItem.iconSvgPath}
                    </div>
                }
                <div className={`navitem-title`}>
                    {navItem.title}
                </div>
            </a>
        )
    }
}
import { observable } from "mobx";
import { FunctionComponent } from "react";

export interface NavigationItem {
    title: string
    isSelected: boolean
    icon?: any
}

export class ObservableNavigationItems {
    @observable items: NavigationItem[] = []
}
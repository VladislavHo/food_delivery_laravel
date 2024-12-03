import { makeAutoObservable } from "mobx";

class Store {

  sessionUser = true


  constructor() {
    makeAutoObservable(this)
  }

  sessionUserActions = (value: boolean) => {
    this.sessionUser = value
  }
}


export default new Store()
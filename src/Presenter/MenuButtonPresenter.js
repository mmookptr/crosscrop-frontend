class MenuButtonPresenter {
  constructor(buttonText, toPath, subMenuButtonPresenters = []) {
    this.buttonText = buttonText;
    this.toPath = toPath;
    this.subMenuButtonPresenters = subMenuButtonPresenters;
  }
}

export default MenuButtonPresenter;

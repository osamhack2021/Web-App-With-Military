const loadImage = async () => {
  try {
    const { default: src } = await import(/* webpackMode: "lazy" */ `../../images/headers/${this.props.name}.png`);
    this.setState({ src });
  } catch (err) {
    this.setState({ err: err.toString() });
  }
}; 

export { loadImage };
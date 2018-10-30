import React from "react";

const getComponentName = Component =>
  Component.displayName || Component.name || "UnknownComponent";

export const decorateWithContext = Context => mapContextToProps => Component =>
  class extends React.PureComponent {
    static displayName = `decorateWithContext(${getComponentName(Component)})`;

    render() {
      const { props } = this;

      return (
        <Context.Consumer>
          {context => (
            <Component {...props} {...mapContextToProps(context, props)} />
          )}
        </Context.Consumer>
      );
    }
  };

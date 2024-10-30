import { renderApp } from '../views/app';

jest.mock('../views/app', () => ({
  renderApp: jest.fn(() => Promise.resolve(document.createElement('div')))
}));

describe('Main App Initialization', () => {
  let root: HTMLElement | null;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    root = document.getElementById('app');
  });

  it('should render the app and append it to #app', async () => {
    await import('../main');

    expect(renderApp).toHaveBeenCalled();
    expect(root?.children.length).toBeGreaterThan(0);
    expect(root?.firstChild).toBeInstanceOf(HTMLElement);
  });
});
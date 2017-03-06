import { ExamenTwjMolinaangelPage } from './app.po';

describe('examen-twj-molinaangel App', () => {
  let page: ExamenTwjMolinaangelPage;

  beforeEach(() => {
    page = new ExamenTwjMolinaangelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

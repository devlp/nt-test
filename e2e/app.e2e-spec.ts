import { NtTest } from './app.po';

describe('nt-test App', () => {
  let page: NtTest;

  beforeEach(() => {
    page = new NtTest();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

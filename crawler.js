

class Crawler {

            constructor(pages, skip, error) { 
                this.pages = pages;
                this.success = [this.pages[0].address];
                this.skip = skip;
                this.error = error; 
            }
     
            goToPage(pages, success, skip, error, i) {

                if (i === pages.length)
                    return 0;

                for (let ii in pages[i].links)
                    this.goToLinks(pages, success, skip, error, pages[i].links[ii], true, 0);

                return this.goToPage(pages, success, skip, error, i + 1);
            }

            goToLinks(pages, success, skip, error, link, isError, i) {

                if (i === pages.length) {
                    if (isError)
                        this.error.push(link);
                    return 0;
                }

                if (pages[i].address === link) {
                    isError = false;
                    this.pushSuccessSkip(link)

                    for (let l in pages[i].links)
                        if (pages[i].links[l] === link)
                            this.pushSuccessSkip(link)
                }

                return this.goToLinks(pages, success, skip, error, link, isError, i + 1);
            }

            pushSuccessSkip(link) {
                if (!this.success.includes(link))
                    this.success.push(link);
                else if (!this.skip.includes(link))
                    this.skip.push(link);
            }

            print(s, sk, e) { 
                s.innerHTML = `Success: ${JSON.stringify(this.success)}`;
                sk.innerHTML = `Skip: ${JSON.stringify(this.skip)}`;
                e.innerHTML = `Error: ${JSON.stringify(this.error)}`;
            }
             
        }

var assert = require('assert'); 

// Create a group of tests about Arrays
describe('json', function () { 
    // Test One: A string explanation of what we're testing
    let internet_1 = {
        "pages": [
            {
                "address": "http://foo.bar.com/p1",
                "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p3", "http://foo.bar.com/p4"]
            },
            {
                "address": "http://foo.bar.com/p2",
                "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p4"]
            },
            {
                "address": "http://foo.bar.com/p4",
                "links": ["http://foo.bar.com/p5", "http://foo.bar.com/p1", "http://foo.bar.com/p6"]
            },
            {
                "address": "http://foo.bar.com/p5",
                "links": []
            },
            {
                "address": "http://foo.bar.com/p6",
                "links": ["http://foo.bar.com/p7", "http://foo.bar.com/p4", "http://foo.bar.com/p5"]
            }
        ]
    };

    let success = [internet_1.pages[0].address];
    let skip = [];
    let error = [];
    let expectSuccess = ["http://foo.bar.com/p1", "http://foo.bar.com/p2", "http://foo.bar.com/p4", "http://foo.bar.com/p5", "http://foo.bar.com/p6"].toString;
    let expectSkip = ["http://foo.bar.com/p2", "http://foo.bar.com/p4", "http://foo.bar.com/p1", "http://foo.bar.com/p5"].toString;
    let expectError = ["http://foo.bar.com/p3", "http://foo.bar.com/p7"].toString;
      
    function goToPage(pages, success, skip, error, i) {

        if (i === pages.length)
            return 0;

        for (let ii in pages[i].links)
            goToLinks(pages, success, skip, error, pages[i].links[ii], true, 0);

        return goToPage(pages, success, skip, error, i + 1);
    }

    function goToLinks(pages, success, skip, error, link, isError, i) {

        if (i === pages.length) {
            if (isError)
                error.push(link);
            return 0;
        }

        if (pages[i].address === link) {
            isError = false;
            pushSuccessSkip(link)

            for (let l in pages[i].links)
                if (pages[i].links[l] === link)
                    pushSuccessSkip(link)
        }

        return goToLinks(pages, success, skip, error, link, isError, i + 1);
    }

    function pushSuccessSkip(link) {
        if (!success.includes(link))
            success.push(link);
        else if (!skip.includes(link))
            skip.push(link);
    }

    //INTERNET 1
    goToPage(internet_1.pages, success, skip, error, 0);

    it(`should test if success => ["http://foo.bar.com/p1", "http://foo.bar.com/p2", "http://foo.bar.com/p4", "http://foo.bar.com/p5", "http://foo.bar.com/p6"]`, function () { 
        assert.equal(expectSuccess, success.toString);
    });

    it(`should test if skip => ["http://foo.bar.com/p2", "http://foo.bar.com/p4", "http://foo.bar.com/p1", "http://foo.bar.com/p5"]`, function () {
        assert.equal(expectSkip, skip.toString);
    });

    it(`should test if error => ["http://foo.bar.com/p3", "http://foo.bar.com/p7"]`, function () {
        assert.equal(expectError, skip.toString);
    });

});


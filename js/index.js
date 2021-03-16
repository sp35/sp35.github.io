$( document ).ready(function() {
    fillPortfolio();
});

// fill portfolio grid items and modals
function fillPortfolio() {
    $.getJSON("../assets/data/portfolio_and_skills.json", function(data){
        let portfolioGridItemsHTML = ``, portfolioModalItemsHTML = ``, skillItemsHTML = ``;
        const portfolioData = data["portfolios"];
        const skillData = data["skills"];
        
        for (let i=0; i < portfolioData.length; i++) {
            portfolioGridItemsHTML += genNewPortfolioGrid(index=i, pObj=portfolioData[i]);
            portfolioModalItemsHTML += genNewPortfolioModal(index=i, pObj=portfolioData[i]);
        }
        $("#portfolio-grid-items-list").html(portfolioGridItemsHTML);
        $("#portfolio-modal-list").html(portfolioModalItemsHTML);

        for (let i=0; i < skillData.length; i++) {
            skillItemsHTML += `
            <div class="col-md-2 mb-5">
                <div class="d-flex flex-column align-items-center">
                    <img class="img-fluid mb-3" src="${skillData[i].image}" alt="${skillData[i].name}"/>
                    <h6>${skillData[i].name}</h6>
                </div>
            </div>`
        }
        $("#skills-items-list").html(skillItemsHTML);
        
    }).fail(function(){
        console.log("Couldn't get portfolio and skill data");
    });
}

function genNewPortfolioGrid(index, pObj) {
    return `
    <div class="col-md-6 col-lg-4 mb-5">
        <div class="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal${index}">
            <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
            </div><img class="img-fluid" src="${pObj.image}" alt="${pObj.name}"/>
        </div>
    </div>`
}

function genNewPortfolioModal(index, pObj) {
    let sourceURL = "";
    if (Object.keys(pObj).includes("source_url"))
        sourceURL += `<a target= "_blank" rel= "noopener noreferrer" class="btn btn-outline-primary mb-2" href="${pObj.source_url}"><i class="fab fa-github"></i> Source</a>`

    return `
    <div class="portfolio-modal modal fade" id="portfolioModal${index}" tabindex="-1" role="dialog" aria-labelledby="#portfolioModal${index}Label" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i class="fas fa-times"></i></span></button>
                <div class="modal-body text-center">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <!-- Portfolio Modal - Title-->
                                <h2 class="portfolio-modal-title text-secondary mb-0">${pObj.name}</h2>
                                <!-- Icon Divider-->
                                <div class="divider-custom">
                                    <div class="divider-custom-line"></div>
                                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                                    <div class="divider-custom-line"></div>
                                </div>
                                <!-- Portfolio Modal - Image--><img class="img-fluid rounded mb-5" src="${pObj.image}" alt="BITS Pilani Sports Union"/>
                                <a target= "_blank" rel= "noopener noreferrer" class="btn btn-outline-primary mb-2" href="${pObj.project_url}"><i class="fas fa-external-link-alt"></i> Project</a>
                                ${sourceURL}   
                                <!-- Portfolio Modal - Text-->
                                <p class="mb-5">${pObj.description}</p>
                                <button class="btn btn-primary" href="#" data-dismiss="modal"><i class="fas fa-times fa-fw"></i>Close Window</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}

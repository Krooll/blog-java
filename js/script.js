'use strict'; 

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  
  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active'); 
  console.log('clickedElement:', clickedElement);
  
  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active'); 
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active'); 
  }
  
  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href'); 
  console.log(articleSelector); 
  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);   
  
  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');   

}

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagListSelector = '.tags.list',
  optAuthorsListSelector ='.list.authors',
  optCloudClassCount = 5, 
  optCloudClassPrefix = 'tag-size-';

  function generateTitleLinks(customSelector = ''){

    /*remove content of titleList*/

    const titleList = document.querySelector(optTitleListSelector);
        
    titleList.innerHTML = ''; 
        
    /*find all the articles and save them to variable: articles*/

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html= ''; 

    for(let article of articles){
        
      /*get the article id*/

      const articleId = article.getAttribute('id'); 

      /* find title element*/

      const articleTitle =article.querySelector(optTitleSelector).innerHTML

      /* get the title from the title element*/

      console.log('Title: ', articleTitle);

      /*creat html of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span><a/></li>';

      /*insert link into variable*/

      html = html + linkHTML;

    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagsParams(tags){

    const params = { max : 0, min : 999999};

    for(let tag in tags){
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
      console.log(tag + 'is used' + tags[tag] + ' times'); 
    }

    return params; 
  }

  function calculateTagClass(count,params){

    const normalizedCount = count - params.min; 
    const normalizedMax = params.max - params.min; 
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage *(optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
  }

  function generateTags (){

    /*NEW create new variable allTags witch empty object*/ 

    let allTags = {};

    /*find all article*/

    const articles = document.querySelectorAll(optArticleSelector);

    /*START LOOP: for every article*/

    for(let article of articles){

      /*find tags wrapper*/

      const tagWrapper = article.querySelector(optArticleTagsSelector);

      /*make html variable with empty string*/

      let html = '';

      /*get tags from data-tag attribute*/

      const articleTags = article.getAttribute('data-tags');

      /*split tags into aray*/

      const articleTagsArray = articleTags.split(' ');

      /*START LOOP: for each tag*/

      for(let tag of articleTagsArray){

        /*generate HTML of the link*/

        const linkHTML = '<li><a href="#tag-'+ tag +'"><span>'+ tag +'</span></a></li>';
        console.log(linkHTML);

        /*add generated code to html variable*/

        html = html + linkHTML;

        /*NEW check if this link is NOT already in allTags*/

        if(!allTags[tag]){

          /*NEW generate code to allTags object*/

          allTags[tag] = 1; 
        }else {
          allTags[tag] ++; 
        }

      /*END LOOP : for each tag*/

      }

      /*insert HTML of all the links into tags wrapper*/

      tagWrapper.innerHTML = html; 

    /*END LOOP: for every article*/

    }

    /*NEW find list of tags in right column*/

    const tagList = document.querySelector(optTagListSelector);

    /*NEW add html from allTags to taglist*/

    //tagList.innerHTML = allTags.join('');
    console.log(allTags);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams', tagsParams);

    /*NEW create variable for all links HTML code*/

    let allTagsHTML = '';

    /*NEW START LOOP: for each tag in allTags:*/

    for(let tag in allTags){

      /*generate code of a link and add it to allTagsHTML*/

      const tagLinkHTML = '<li><a class="'+ calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag+ '">' + tag + '</a></li>';

      allTagsHTML += tagLinkHTML;

      /*NEW END LOOP: for each tag in allTags*/

    }

    /*NEW add HTML from allTagsHTML to tagList*/ 

    tagList.innerHTML = allTagsHTML; 
    
  }

  generateTags();

  function tagClickHandler(event){

    /*prevent default action for this event*/

    event.preventDefault(); 

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this; 

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href'); 

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', ''); 

    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    for(let activeTag of activeTags){

        /* remove class active */

        activeTag.classList.remove('active'); 

    /* END LOOP: for each active tag link */
    
    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('[href^="' + href + '"]');

    /* START LOOP: for each found tag link */

    for(let tagLink of tagLinks){

         /* add class active */

         tagLink.classList.add('active'); 

    /* END LOOP: for each found tag link */

    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  function addClickListenerToTags(){

    /*find all links to tags */

    const links = document.querySelectorAll('.list.list-horizontal a, .list.tags a');
    
    /* START LOOP: for each link*/

    for(let link of links){

        /*add tagClickHandler as event listnere to that link*/

        link.addEventListener('click', tagClickHandler);

    /*END LOOP: for each link*/
    }
  }

  addClickListenerToTags();

function generateAuthors(){

  /*NEW create new variable allAuthors witch empty array*/ 

  let allAuthors = [];

  /*find all authors*/

  const articles = document.querySelectorAll(optArticleSelector);

  /*START LOOP: for every article*/

  for(let article of articles){
    
    /*find tags wrapper*/

    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    
    /*make html variable with empty string*/

    let html = ''; 

    /*get tags from data-tag attribute*/

    const authorTag = article.getAttribute('data-author');
    

    /* generate HTML of the link */

    const linkHTML = '<p class="post-author"><a href="#author-' + authorTag + '">' + authorTag + '</a></p>';

    /* add generated code to html variable */

    html = html + linkHTML;

    /*NEW check if this link is NOT already in allAuthors*/

    if(allAuthors.indexOf(linkHTML) == -1){

      /*NEW generate code to allTags array*/

      allAuthors.push(linkHTML);
    }

    /*insert HTML of all the links into tags wrapper*/

     authorWrapper.innerHTML = html; 
  }

  /*NEW find list of tags in right column*/

  const authorList = document.querySelector(optAuthorsListSelector);


  /*NEW add html from allTags to taglist*/

  authorList.innerHTML = allAuthors.join('');

}

generateAuthors();

function authorClickHandler(event){

  /*prevent default action for this event*/

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this; 

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href'); 

  /* make a new constant "tag" and extract tag from the "href" constant */

  const author = href.replace('#author-', '');

  /* find all tag links with class active */

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */

  for(let activeAuthor of activeAuthors){

    /* remove class active */

    activeAuthor.classList.remove('active');

  /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll('[href^="' + href + '"]');

  /* START LOOP: for each found tag link */

  for(let authorLink of authorLinks){

    /* add class active */

    authorLink.classList.add('active');

  /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenerToAuthors(){

  /*find all links to tags */

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link*/

  for(let authorLink of authorLinks){

    /*add tagClickHandler as event listnere to that link*/

    authorLink.addEventListener('click', authorClickHandler);

    /*END LOOP: for each link*/

  }
}

addClickListenerToAuthors();


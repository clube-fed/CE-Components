//callouts script
//needs the global script to function
function ImgBG(e){for(var r=e.trim().split(/\s*,\s*/),l=0;l<r.length;l++)for(var t=document.querySelectorAll(r[l]),n=0;n<t.length;n++){var a=t[n].getElementsByTagName("*"),g=!1;if(a.length>0)for(var o=0;o<a.length;o++){var s=a[o].nodeName;"IMG"==s&&0==g&&(t[n].style.backgroundImage="url("+a[o].src+")",a[o].style.display="none",g=!0)}}}

//global cte builder
//setup tools
function cteBuild(el) {
  if ($j(el).parents('a').length) {
    	var cte = $j(el).parents('a').next();
	} else {
   		var cte = $j(el).next();
	}
  console.log(cte);
  const imgCte = $j(el).find('[class*="-img"] .clickToEditDiv').detach();
  const txtCte = $j(el).find('[class*="-txt"] .clickToEditDiv').detach();
  $j(cte).find('[class*="-cte-img"]').append(imgCte);
  $j(cte).find('[class*="-cte-txt"]').append(txtCte);
  $j(cte).find('[class*="-cte-link"] > .mpContent').html('');
}

//wrap item in a link
function calloutLinkWrap(el,type) {
  console.log(el);
  const itemLink = $j.trim($j(el).next().find('.'+type+'-cte-link > .mpContent').text());
  $j(el).wrap('<a class="'+type+'-link" href="'+itemLink+'"></a>');
}


if($j('.callouts').length) {
  $j('.callout-item').each(function(){
    calloutLinkWrap(this,'callout');
    cteBuild(this); //cteBuild always called last
    });
} else {
  return
}

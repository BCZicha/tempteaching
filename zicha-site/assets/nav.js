/* Masthead, course tabs and footer, shared by both course sections.
   dmp/nav.js and igd/nav.js call COURSE_NAV(...) with their own tab list. */
function COURSE_NAV(course, courseName, tabs, current) {
  window.SITE_COURSE = course;
  var html =
    '<header class="masthead"><div class="masthead-inner">' +
    '<a class="brand" href="../index.html">Brandon C. Zicha<small>Teaching &amp; Writing</small></a>' +
    '<nav class="primary">' +
    '<a href="../index.html">Home</a>' +
    '<a class="ext" data-link="link-substack" href="https://friendlyprofessing.substack.com">Substack</a>' +
    '<a href="../college-project/index.html">The College Project</a>' +
    '<a' + (course === 'igd' ? ' class="current"' : '') + ' href="../igd/index.html">IGD</a>' +
    '<a' + (course === 'dmp' ? ' class="current"' : '') + ' href="../dmp/index.html">DMP</a>' +
    '</nav><span class="whoami" id="whoami"></span></div></header>' +
    '<div class="subnav"><div class="subnav-inner">' +
    '<span class="course-name">' + courseName + '</span>';
  tabs.forEach(function (t) {
    html += '<a class="tab' + (t[0] === current ? ' current' : '') + '" href="' + t[2] + '">' + t[1] +
      (t[3] ? ' <span class="lock" title="Sign-in required">🔒</span>' : '') + '</a>';
  });
  html += '</div></div>';
  document.write(html);
}
function COURSE_FOOTER(courseName) {
  document.write(
    '<footer class="footer"><div class="footer-inner">' +
    '<span>© <span data-text="year"></span> <span data-text="instructor">Brandon C. Zicha</span></span>' +
    '<span>' + courseName + ' · <span data-text="institution">Leiden University College The Hague</span></span>' +
    '</div></footer>');
}

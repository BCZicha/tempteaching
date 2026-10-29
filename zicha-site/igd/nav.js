/* Renders the masthead and the IGD course tabs. Usage: <script>IGD_NAV('syllabus')</script> at top of <body>. */
document.write('<script src="../assets/nav.js"><\/script>');
function IGD_NAV(current) {
  COURSE_NAV('igd', 'Institutions of Governance &amp; Development', [
    ['index', 'Overview', 'index.html', false],
    ['syllabus', 'Syllabus', 'syllabus.html', false],
    ['schedule', 'Schedule', 'schedule.html', false],
    ['readings', 'Readings', 'readings.html', true],
    ['assessments', 'Assessments', 'assessments.html', false]
  ], current);
}
function IGD_FOOTER() { COURSE_FOOTER('Institutions of Governance &amp; Development'); }

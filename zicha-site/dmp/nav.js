/* Renders the masthead and the DMP course tabs. Usage: <script>DMP_NAV('syllabus')</script> at top of <body>. */
document.write('<script src="../assets/nav.js"><\/script>');
function DMP_NAV(current) {
  COURSE_NAV('dmp', 'Decision-Making Processes', [
    ['index', 'Overview', 'index.html', false],
    ['syllabus', 'Syllabus', 'syllabus.html', false],
    ['readings', 'Readings', 'readings.html', true],
    ['problem-sets', 'Problem Sets', 'problem-sets.html', true],
    ['assessments', 'Assessments', 'assessments.html', false],
    ['exam', 'Exam Prep', 'exam-prep.html', false]
  ], current);
}
function DMP_FOOTER() { COURSE_FOOTER('Decision-Making Processes'); }

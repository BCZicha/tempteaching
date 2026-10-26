/* ==========================================================================
   SITE CONFIGURATION — edit this file; nothing else needs to change.
   ========================================================================== */
window.SITE_CONFIG = {

  /* Instructor */
  instructor: "Dr. Brandon C. Zicha",
  instructorEmail: "b.c.zicha@luc.leidenuniv.nl",
  institution: "Leiden University College The Hague",
  office: "4.10",
  /* Office hours are booked through Microsoft Bookings */
  officeHoursUrl: "https://bookings.cloud.microsoft/book/DrZsOfficeHours@leidenuniv1.onmicrosoft.com/?ismsaljsauthenabled",

  /* External links */
  substackUrl: "https://friendlyprofessing.substack.com",
  collegeProjectUrl: "",          /* leave empty until the site exists */

  /* Brightspace. `brightspaceUrl` is the general entry page and is used for
     every "submit via Brightspace" link. If you later want a link that goes
     straight to a particular dropbox, put it in the matching slot below;
     anything left empty falls back to `brightspaceUrl`. */
  brightspaceUrl: "https://www.student.universiteitleiden.nl/en/all-facilities/it-facilities/brightspace",
  brightspace: {
    dmp: { course: "", baseline: "", reflection: "", problemSets: "" },
    igd: { course: "", essay: "" }
  },

  /* ---------------------------------------------------------------------
     STUDENT SIGN-IN
     Students must use an institutional e-mail. Any address whose domain
     is in, or ends with, one of these entries is accepted.
     --------------------------------------------------------------------- */
  allowedDomains: [
    "umail.leidenuniv.nl",        /* Leiden students */
    "vuw.leidenuniv.nl",
    "luc.leidenuniv.nl",          /* LUC staff */
    "leidenuniv.nl"               /* any other Leiden sub-domain */
  ],

  /* ---------------------------------------------------------------------
     COURSES — each has its own password and its own reading folder.
     passwordHash  : SHA-256 of the course password (never the password itself).
     readingFolder : the Google Drive link, encrypted with the course password
                     so that it is not readable in the page source.
     Both values come from tools/password-hash.html — type the password (and
     the folder link), then paste what it gives you here.
     Defaults:  DMP password "dmp-2026"   ·   IGD password "igd-2026"
     --------------------------------------------------------------------- */
  courses: {
    dmp: {
      name: "Decision-Making Processes",
      passwordHash: "8ff004f67266b9c0883a485656a3962b5bb24bacb78503c097a5fcd454195f4d",
      readingFolder: {
        salt: "3uPlEHwK7cVud+NC6z8EsA==",
        iv: "vJBwGhTU0PLmHjD2",
        ct: "BEhb7KuehG9sOD+JLVsty9+Xhh5cYtRxlb2tScdEImddvyeel7TgScowQ9Jz32N+eWJTa2zw3PzY9p4z77MXsUPstR9OroJCvMLnC3SObzEAVcVb6LLgamcvviInM7Rke4bF6cqI3w=="
      }
    },
    igd: {
      name: "Institutions of Governance and Development",
      passwordHash: "709b17a2042dff9371d7c33e75dd3e842f08c9f2d643ed43920413f430760840",
      readingFolder: {
        salt: "gJ7S2LqhSxhFu0RXLzAZBQ==",
        iv: "jc3WpyJs74G+j3kF",
        ct: "zkUARxwhXX3/wgXWLnWK2rLCzNT3/HvuWM0CyWpTPlgdSjRFdzLaCLx7hfDRYteerGdBLMFyZUNXs8PdoX2Er4ztFhaDMccIjtVT79i1Abbtgt1BK7pqQXl0mFMyI3AXm4Y1EUmTaQ=="
      }
    }
  },

  /* Session length in hours before students must sign in again */
  sessionHours: 24 * 14
};

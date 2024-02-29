import boxes from "./scripts/boxesData.js";
import dataSet from "./scripts/tableData.js";

$(document).ready(function () {

  $("#addCustomFramework").on("shown.bs.modal", function () {
    stepperInit();
  });

  setTimeout(function () {
    boxesCreate();
    const newCustomFrameworkBtn = document.getElementById("addCustomFramworkBtn");
    newCustomFrameworkBtn.addEventListener("click", function () {
      formDataClear()
    });
  } , 200);

  const dataTableModal = new DataTable("#dataTableModal", {
    responsive: true,
    paging: false,
    scrollResize: true,
    scrollCollapse: true,
    layout: {
      topStart: null,
      topEnd: null,
      bottomStart: null,
    },
  });

  function stepperInit() {
    formDataClear();
    const firstStepForm = document.getElementById("firstStepForm");
    const firstStepNextBtn = document.querySelector("#firstStepNextBtn");
    const secondStepForm = document.getElementById("secondStepForm");
    const secondStepBtn = document.querySelector(".stepper-btn.second");
    const secondStepPrevBtn = document.querySelector("#secondStepPrevBtn");

    secondStepForm.classList.remove("active");
    secondStepBtn.classList.remove("active");
    firstStepForm.classList.add("active");

    firstStepNextBtn.addEventListener("click", function (e) {
      let data = firstStepForm.checkValidity();
      if (data) {
        e.preventDefault();
        firstStepForm.classList.remove("active");
        secondStepForm.classList.add("active");
        secondStepBtn.classList.add("active");
        dataTableModal.draw();
      }
    });

    secondStepPrevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      secondStepForm.classList.remove("active");
      firstStepForm.classList.add("active");
      secondStepBtn.classList.remove("active");
    });
  }

  function boxesCreate() {
    boxes.forEach((data) => {
      $("#box-container").append(
        '<div class="card box"><div class="d-flex"> <img width="80" class="avatar-img" src="../src/assets/' +
        data.logoName +
        '.svg"> <div class="card-text d-flex flex-column justify-content-center align-items-start"> <span> ' +
        data.title +
        '</span><p class="title"> ' +
        data.category +
        '</p> <p class="description"> ' +
        data.categoryDescription +
        '</span></div> </div><div class="box-info ' +
        data.stateColor +
        '"><i class="fa fa-info-circle" aria-hidden="true"></i> ' +
        data.state +
        " </div></div>"
      );
    });

    const dataTable = new DataTable("#dataTable", {
      responsive: true,
      scrollY: "50vh",
      scrollX: true,
      scrollResize: true,
      scrollCollapse: true,
      layout: {
        topStart: "search",
        topEnd: null,
        bottomStart: null,
      },
      columns: [
        { title: "Control ID" },
        { title: "Control Category" },
        { title: "Control Description" },
      ],
      data: dataSet,
    });

    let boxList = $(".box");
    boxList.click(function () {
      boxList.removeClass("active");
      this.classList.add("active");

      $("#table-container .card.empty").css("display", "none");
      $("#table-container .card.table").css("display", "flex");

      dataTable.draw();
    });
  }

  function formDataClear() {
    $(":input", "#addCustomFramework")
      .not(":button, :submit, :reset, :hidden")
      .val("")
      .prop("checked", false)
      .prop("selected", false);
  }
});



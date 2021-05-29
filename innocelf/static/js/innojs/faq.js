"use strict";

class FAQIndividualCard extends HTMLDivElement {
  static get observedAttributes() {
    return ["id", "class"];
  }

  constructor() {
    super();
  }

  get elementId() {
    return this.getAttribute("id");
  }

  get elementClassList() {
    return this.getAttribute("class");
  }

  get parentAccordianId() {
    return this.getAttribute("parent-accordian-id");
  }

  get question() {
    return this.getAttribute("question");
  }

  get answer() {
    return this.getAttribute("answer");
  }

  set elementId(newValue) {
    this.setAttribute("id", newValue);
  }

  set elementClassList(newValue) {
    this.setAttribute("class", newValue);
  }

  set parentAccordianId(newValue) {
    this.setAttribute("parent-accordian-id", newValue);
  }

  set question(newValue) {
    this.setAttribute("question", newValue);
  }

  set answer(newValue) {
    this.setAttribute("answer", newValue);
  }

  connectedCallback() {
    this.id = this.elementId;
    this.classList = this.elementClassList;
    this.append(this.createCardHeader(), this.createCardBody());
  }

  createCardHeader() {
    // Create a card header
    let cardHeader = document.createElement("div");
    cardHeader.classList = "card-header bg-dark py-0";
    cardHeader.id = this.elementId + "_cardHeader";
    cardHeader.setAttribute("role", "tab");

    // Create the ATag that will manipulate the accordian cards
    let aTag = document.createElement("a");
    aTag.href = "#" + this.elementId + "_cardBody";
    // aTag.setAttribute(
    //   "style",
    //   "display: inline-block; height: 35px; width: 1000px"
    // );
    aTag.setAttribute("data-parent", "#" + this.parentAccordianId);
    aTag.setAttribute("data-toggle", "collapse");
    aTag.setAttribute("aria-expanded", "true");
    aTag.setAttribute("aria-controls", this.elementId + "_cardBody");

    // Create an icon
    let icon = document.createElement("i");
    icon.classList = "fas fa-2x fa-angle-down rotate-icon text-light";

    // Create the card heading
    let heading = document.createElement("h6");
    heading.classList = "text-light mb-3 mt-3";
    heading.textContent = this.question;
    heading.append(icon);

    // Append icon and heading to the atag
    aTag.append(heading);

    // Append aTag to the card header
    cardHeader.append(aTag);

    return cardHeader;
  }

  createCardBody() {
    // Create collapse wrapper
    let collapseWrapper = document.createElement("div");
    collapseWrapper.id = this.elementId + "_cardBody";
    collapseWrapper.classList = "collapse";
    collapseWrapper.setAttribute("role", "tabpanel");
    collapseWrapper.setAttribute(
      "aria-labelledby",
      this.elementId + "_cardHeader"
    );
    collapseWrapper.setAttribute("data-parent", this.parentAccordianId);

    // Create card body
    let cardBody = document.createElement("div");
    cardBody.classList =
      "card-body rgba-black-light cloudy-knoxville-gradient z-depth-1";

    // Create a paragraph to hold the answer
    let para = document.createElement("p");
    para.classList = "p-md-4 mb-0";
    para.innerHTML = this.answer;

    // Append para to cardBody
    cardBody.append(para);

    // Append cardBody to collapseWrapper
    collapseWrapper.append(cardBody);

    return collapseWrapper;
  }
}

window.customElements.define("faq-individual-card", FAQIndividualCard, {
  extends: "div",
});

document
  .getElementById("expand_all_questions")
  .addEventListener("click", function () {
    // All collapse items
    let allCollapseItems = document.querySelectorAll(".collapse");
    for (let i = 0; i < allCollapseItems.length; i++) {
      allCollapseItems[i].classList.add("show");
    }
  });

document
  .getElementById("collapse_all_questions")
  .addEventListener("click", function () {
    // All collapse items
    let allCollapseItems = document.querySelectorAll(".collapse.show");
    for (let i = 0; i < allCollapseItems.length; i++) {
      allCollapseItems[i].classList.remove("show");
    }
  });

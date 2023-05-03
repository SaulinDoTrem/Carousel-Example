document.addEventListener("DOMContentLoaded", function () {
    buildCarousel(".item", "current-item", "arrow-left");
});

function buildCarousel(itemClass, currentItemClassName, arrowLeftClassName) {
    const arrows = document.querySelectorAll(".arrow");
    let currentItem = 0;
    const items = document.querySelectorAll(itemClass);
    const maxItem = items.length - 1;

    addCopyItems(items);
    initializeCarousel();

    arrows.forEach((arrow) => {
        arrow.addEventListener("click", function () {
            const isArrowLeft = this.classList.contains(arrowLeftClassName);

            const previousItem = items.item(currentItem);

            if (previousItem.classList.contains(currentItemClassName))
                previousItem.classList.remove(currentItemClassName);

            if (isArrowLeft) {
                currentItem -= 1;
                if (currentItem < 0) currentItem = maxItem;
            } else {
                currentItem += 1;
                if (currentItem > maxItem) currentItem = 0;
            }

            const actualItem = items.item(currentItem);

            console.log(actualItem);

            if (!actualItem.classList.contains(currentItemClassName))
                actualItem.classList.add(currentItemClassName);

            actualItem.scrollIntoView({
                inline: "center",
                behavior: "smooth",
            });
        });
    });
}

function initializeCarousel() {
    const actualItem = document.querySelector(".current-item");
    actualItem.scrollIntoView({
        inline: "center",
        behavior: "smooth",
    });
}

function addCopyItems(items) {
    const gallery = document.querySelector(".gallery");

    const copyItemsBefore = createCopyItemsArray(items);

    const copyItemsAfter = createCopyItemsArray(items);

    copyItemsBefore.forEach((item) => {
        gallery.appendChild(item);
    });

    let a = 0;

    copyItemsAfter.forEach((item) => {
        gallery.insertBefore(item, gallery.children.item(a));
        a++;
    });
}

function createCopyItemsArray(originalArray) {
    const array = [];

    originalArray.forEach((e) => {
        const newItem = document.createElement("img");

        newItem.src = e.src;
        newItem.classList.add("copy-item");
        array.push(newItem);
    });

    return array;
}

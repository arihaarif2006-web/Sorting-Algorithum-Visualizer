let array = [];
let container = document.getElementById("array");
function setInfo(type){

    let text = "";

    if(type === "bubble"){
        text = "Bubble Sort: Repeatedly compares adjacent elements and swaps them if they are in the wrong order. Time Complexity: O(n²)";
    }

    else if(type === "insertion"){
        text = "Insertion Sort: Builds the sorted array one element at a time by inserting elements in the correct position. Time Complexity: O(n²)";
    }

    else if(type === "quick"){
        text = "Quick Sort: Uses a pivot to partition the array into smaller parts and sorts them recursively. Average Time Complexity: O(n log n)";
    }

    else if(type === "merge"){
        text = "Merge Sort: Divides the array into halves, sorts them, and merges them back together. Time Complexity: O(n log n)";
    }

    document.getElementById("definition").innerText = text;
}
function generateArray(){
    container.innerHTML = "";
    array = [];

    for(let i = 0; i < 30; i++){
        // Generate numbers from 0 to 150
        let value = Math.floor(Math.random() * 151);
        array.push(value);

        let bar = document.createElement("div");
        bar.classList.add("bar");

        let valueLabel = document.createElement("span");
        valueLabel.innerText = value;

        bar.style.height = value * 3 + "px";
        bar.appendChild(valueLabel);

        container.appendChild(bar);
    }
}
function createArrayFromInput(){
    let input = document.getElementById("userInput").value;

    // Convert input to numbers
    let values = input.split(",").map(v => Number(v.trim()));

    // Check if all are valid numbers
    if(values.some(isNaN)){
        alert("Please enter valid numbers separated by commas!");
        return;
    }

    if(values.some(v => v < 1 || v > 150)){
        alert("All numbers must be between 1 and 150!");
        return;
    }

    // If valid, create the array
    array = values;
    container.innerHTML = "";

    array.forEach(value => {
        let bar = document.createElement("div");
        bar.classList.add("bar");

        let valueLabel = document.createElement("span");
        valueLabel.innerText = value;

        bar.style.height = value * 3 + "px";
        bar.appendChild(valueLabel);

        container.appendChild(bar);
    });
}
// generateArray();
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function bubbleSort(){

    let bars = document.getElementsByClassName("bar");

    for(let i=0;i<array.length;i++){
        for(let j=0;j<array.length-i-1;j++){

            bars[j].style.backgroundColor="#c78d75";
            bars[j+1].style.backgroundColor="#c78d75";

            await new Promise(resolve=>setTimeout(resolve,100));

           if(array[j] > array[j+1]){
    let temp = array[j];
    array[j] = array[j+1];
    array[j+1] = temp;

    // Update bars and numbers
    bars[j].style.height = array[j] * 3 + "px";
    bars[j].childNodes[0].innerText = array[j];

    bars[j+1].style.height = array[j+1] * 3 + "px";
    bars[j+1].childNodes[0].innerText = array[j+1];
}

            bars[j].style.backgroundColor="#96634e";
            bars[j+1].style.backgroundColor="#96634e";
        }
    }
}
async function insertionSort() {
    if(array.length === 0){
        alert("Please generate or input an array first!");
        return;
    }

    let bars = document.getElementsByClassName("bar");

    for(let i = 1; i < array.length; i++){
        let key = array[i];
        let j = i - 1;

        // Shift elements that are greater than key
        while(j >= 0 && array[j] > key){
            // Highlight the bars being compared
            bars[j].style.backgroundColor = "#c78d75";
            bars[j+1].style.backgroundColor = "#c78d75";

            await sleep(100);

            // Shift element one position to the right
            array[j+1] = array[j];
            bars[j+1].style.height = array[j+1] * 3 + "px";
            bars[j+1].childNodes[0].innerText = array[j+1];

            // Reset colors
            bars[j].style.backgroundColor = "#96634e";
            bars[j+1].style.backgroundColor = "#96634e";

            j--;
        }

        // Place key at its correct position
        array[j+1] = key;
        bars[j+1].style.height = key * 3 + "px";
        bars[j+1].childNodes[0].innerText = key;
    }
}
async function quickSortStart(){
    if(array.length === 0){
    alert("Please generate or input an array first!");
    return;
}
    await quickSort(0, array.length - 1);
}
async function quickSort(low, high){

    if(low < high){
        let pi = await partition(low, high);

        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}
async function partition(low, high){

    let bars = document.getElementsByClassName("bar");

    let pivot = array[high];
    let i = low - 1;

    for(let j = low; j < high; j++){

        bars[j].style.backgroundColor = "#c78d75";
        await sleep(100);

if(array[j] < pivot){
    i++;
    [array[i], array[j]] = [array[j], array[i]];

    // Update bars and numbers
    bars[i].style.height = array[i] * 3 + "px";
    bars[i].childNodes[0].innerText = array[i];

    bars[j].style.height = array[j] * 3 + "px";
    bars[j].childNodes[0].innerText = array[j];
}

// After pivot swap
[array[i+1], array[high]] = [array[high], array[i+1]];

bars[i+1].style.height = array[i+1] * 3 + "px";
bars[i+1].childNodes[0].innerText = array[i+1];

bars[high].style.height = array[high] * 3 + "px";
bars[high].childNodes[0].innerText = array[high];

        bars[j].style.backgroundColor = "#96634e";
    }

    [array[i+1], array[high]] = [array[high], array[i+1]];

    bars[i+1].style.height = array[i+1] * 3 + "px";
    bars[high].style.height = array[high] * 3 + "px";

    return i + 1;
}
async function mergeSortStart(){
    if(array.length === 0){
    alert("Please generate or input an array first!");
    return;
}
    await mergeSort(0, array.length - 1);
}
async function mergeSort(left, right){

    if(left >= right) return;

    let mid = Math.floor((left + right) / 2);

    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
}
async function merge(left, mid, right){

    let bars = document.getElementsByClassName("bar");

    let leftArr = array.slice(left, mid + 1);
    let rightArr = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while(i < leftArr.length && j < rightArr.length){

        bars[k].style.backgroundColor = "#c78d75";
        await sleep(100);

        if(leftArr[i] <= rightArr[j]){
            array[k] = leftArr[i];
            i++;
        } else {
            array[k] = rightArr[j];
            j++;
        }

        bars[k].style.height = array[k] * 3 + "px";
        bars[k].childNodes[0].innerText = array[k];
        bars[k].style.backgroundColor = "#96634e";

        k++;
    }

    while(i < leftArr.length){
        array[k] = leftArr[i];
        bars[k].style.height = array[k] * 3 + "px";
        bars[k].childNodes[0].innerText = array[k];
        i++; k++;
    }

    while(j < rightArr.length){
        array[k] = rightArr[j];
        bars[k].style.height = array[k] * 3 + "px";
        bars[k].childNodes[0].innerText = array[k];
        j++; k++;
    }
}

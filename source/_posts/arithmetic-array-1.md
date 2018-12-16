---
title: 数组
date: 2018-08-05 23:27:02
tags: [arithmetic]
categories: "arithmetic"
---
#### 习题1
>给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

#### 示例:
{% note default %}
给定数组 nums = [1,1,2], 
函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 
你不需要考虑数组中超出新长度后面的元素。
{% endnote %}

#### 正确解答
>- T(n) = O(n)
>- Runtime: fast

```js
var removeDuplicates = function(nums) {
    var i = 0, j ,len = nums.length;
    for(j = i + 1; j < len ; j++){
        if(nums[i] !== nums[j] ){
            nums[++i] = nums[j];
        }
    }
    
    nums.splice(i + 1);   
    return nums.length;
};

```
<!-- more -->

#### 我的解答   
>- T(n) = O(n^2)
>- Runtime: slow

```js
var removeDuplicates = function(nums) {
     for (var i = 0; i < nums.length; i++) {
        for (var j = nums.length - 1; j > i; j--) {
            if (nums[i] == nums[j]) {
                nums.splice(j, 1);
            }
        }
    }
    
    return nums.length
};


```
---
#### 习题2

>给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）
注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

#### 示例:
{% note default %}
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
{% endnote %}

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let number = 0;
    for(let i=0; i<prices.length;i++) {
        if(prices[i] < prices[i+1]) {
            number += prices[i+1] - prices[i]
        }
    }
    return number
};
```